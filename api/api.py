import os
import json
import newspaper
from gnews import GNews 

from flask_cors import CORS
from flask import (
    Flask,
    request,
    jsonify,
)

from detection import (
    get_tokenizer, 
    get_model,
    detect_bias
)

from explanation import get_explainability_prompt, postprocess_explaination
from debias import get_debiasing_prompt, postprocess_debiased_text

from chatgpt_wrapper import OpenAIAPI

app = Flask(__name__)
CORS(app)

def setup_model(model_name, **kwargs):
    model = None
    if model_name == "detection":
        tokenizer_name = kwargs.get("tokenizer_name", "bert-base-cased")
        model_name = kwargs.get("model_name", "bucketresearch/politicalBiasBERT")
        device = kwargs.get("device", "cpu")

        model = (
            get_model(model_name, device),
            get_tokenizer(tokenizer_name)
        )
    
    elif model_name == "chatgpt":
        api_key_file = kwargs.get("api_key_file", "api/secret.key")
        with open(api_key_file, "r") as f:
            api_key = f.readline().strip()

            if not len(api_key):
                return None

            os.environ["OPENAI_API_KEY"] = api_key

        bot = OpenAIAPI()
        model = bot

    return model

models = {
    'detection': setup_model('detection'),
    'chatgpt': setup_model('chatgpt'),
}

@app.route('/model-components', methods=['GET', 'POST'])
def get_model_components():
    """ Gets the bias and model explanation """
    if request.method == "POST":
        data = request.data
        if data:
            data = json.loads(data.decode("utf-8"))
            url = data['json']['url']

            #grab text from url
            text = get_text(url)

            #grabs related news article objects
            related_news, article_title = get_related_news(url)

            #pass text to detection api to get bias
            bias, confidence = get_bias(text)

            #ask gpt to explain the bias
            #explanation = explain_bias(bias, url)

            response = jsonify({
                "url": url,
                "title": article_title,
                "bias": bias,
                "confidence": confidence,
                "explanation": ["","",""],
                "related_articles": related_news
            })

            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

        return "Invalid input"


def get_text(url):
    article = newspaper.Article(url)
    article.download()
    article.parse()
    return article.text

def get_related_news(url):
    google_news = GNews(language='en', max_results=3)
    article = google_news.get_full_article(url)
    json_news = google_news.get_news(article.title)
    for articleIdx in range(len(json_news)):
        if json_news[articleIdx]['url'] == article.title:
            del json_news[articleIdx]
    return json_news, article.title


def get_bias(text): 
    """ Gets bias from classification model """
    if not models['detection']:
        setup_model("detection")

    biasVec = detect_bias(text, *models['detection'])
    print(biasVec)
    if biasVec[0][0] > biasVec[0][1] and biasVec[0][0] > biasVec[0][2]: 
        return "LEFT-WING", biasVec[0][0]
    elif biasVec[0][2] > biasVec[0][1] and biasVec[0][2] > biasVec[0][0]:
        return "RIGHT-WING", biasVec[0][2]
    else:
        return "MODERATE", biasVec[0][1]
    return ""
    

def explain_bias(bias, url): 
    """ Gets explanation of bias from ChatGPT """
    # TODO(): get prompt for explanation
    data = {
        "url": url,
        "bias": bias
    }
    explainability_prompt = get_explainability_prompt(data)
    success, explanation, message = models['chatgpt'].ask(explainability_prompt)
    if not success:
        return message
    
    # TODO(): postprocess explanation
    explanation = postprocess_explaination(explanation)
    return explanation
    

@app.route('/debias', methods=['GET', 'POST'])
def debias_endpoint(): 
    """ Debiases text through ChatGPT """
    if request.method == "POST":
        data = request.data
        if data:
            data = json.loads(data.decode("utf-8"))

            # TODO(): get prompt for debiasing
            debiasing_prompt = get_debiasing_prompt(data)
            success, debiased, message = models['chatgpt'].ask(debiasing_prompt)
            if not success:
                return message
            
            # TODO(): postprocess debiased text
            debiased = postprocess_debiased_text(debiased)
            
            response = jsonify({
                'text': data['text'],
                'debiased': debiased
            })

            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        return "Invalid input"