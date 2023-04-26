def get_debiasing_prompt(data):
    return (
        f"Please remove any {data['bias']}-wing political bias from this piece"
        f"of text: {data['text']}. Just give the debiased text, noting else"
    )

def postprocess_debiased_text(debiased):
    return debiased

if __name__ == "__main__":
    data = {
        'bias': "right",
        'text': 'https://www.foxnews.com/opinion/indictment-donald-trump-manhattan-da-bragg-america-legal-puzzle'
    }
    debiasing_prompt = get_debiasing_prompt(data)

    api_key_file = "api/secret.key"
    with open(api_key_file, "r") as f:
        api_key = f.readline().strip()

    from revChatGPT.V1 import Chatbot
    chatbot = Chatbot(config={
        "access_token": api_key
    })

    debiased = ""
    prev_text = ""
    for data in chatbot.ask(debiasing_prompt):
        message = data["message"][len(prev_text) :]
        debiased += message
        prev_text = data["message"]
    
    # TODO(): postprocess debiased text
    debiased = postprocess_debiased_text(debiased)
    print(debiased)