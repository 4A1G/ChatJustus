def format_query_result(query_result):
    result = "\n...\n".join(f"{d.speaker}: {d.content}" for (score, d) in query_result)
    if not result:
        return "No results found"

def format_query_result_speaker(query_result, speaker:str):
    result = "\n...\n".join(f"{d.speaker}: {d.content}" for (score, d) in query_result if d.speaker == speaker)
    if not result:
        return "No results found"