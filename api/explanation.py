def get_explainability_prompt(data):
    return (
        "Please identify certain phrases in an article that may indicate "
        f"{data['bias']}-wing political bias from an article with this "
        f"link: {data['url']}. Just list bullet points, nothing else."
    )

def postprocess_explaination(explain):
    out = explain.split("\n")
    result = []
    for i in range(1, len(out)):
        result.append(out[i].lstrip("-").lstrip().strip("\""))
    return result


# def explaination(data):
#     bot = ChatGPT()
#     print(data)
#     prompt = get_explainability_prompt(data)
#     print(prompt)
#     ok, response, _ = bot.ask(prompt)
#     print(response)

#     bot._shutdown()

#     return postprocess_explaination(response)

