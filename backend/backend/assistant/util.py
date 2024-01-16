def format_query_result(query_result):
    return "\n...\n".join(f"{d.speaker}: {d.content}" for d in query_result)

def format_query_result_speaker(query_result, speaker):
    return "\n...\n".join(f"{d.speaker}: {d.content}" for d in query_result if d.speaker == speaker)