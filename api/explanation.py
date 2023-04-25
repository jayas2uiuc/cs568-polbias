def get_explainability_prompt(data):
    return (
        "Please identify certain phrases or language in an article that may indicate "
        f"{data['bias']}-wing political bias from an article with this "
        f"link: {data['url']}. Format output in bullet points and provide explanations for each one as well."
    )

def postprocess_explaination(explain):
    out = explain.split("\n")
    result = []
    # for i in range(1, len(out)):
    #     result.append(out[i].lstrip("-").lstrip().strip("\""))
    for i in range(len(out)):
        sent = out[i].lstrip()
        if len(sent) > 0:
            result.append(sent.lstrip("-").lstrip())
    if len(result) < 2:
        return result
    return result[1:len(result)-1]
# phrases = [
#     "Top Democrat",
#     "Democrat's request",
#     "Democrats on the panel",
#     "Democratic lawmaker",
#     "Democratic Rep. Ro Khanna",
#     "Democrats' complaint",
#     "Democratic congressmen",
#     "Democrats' accusations"
# ]


# print(postprocess_explaination(formatted_phrases))

# def explaination(data):
#     bot = ChatGPT()
#     print(data)
#     prompt = get_explainability_prompt(data)
#     print(prompt)
#     ok, response, _ = bot.ask(prompt)
#     print(response)

#     bot._shutdown()

#     return postprocess_explaination(response)
