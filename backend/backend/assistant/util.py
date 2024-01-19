def format_query_result(query_result):
    result = "\n".join(f"[^{i+1}]:{d.speaker}: {d.content}" for i, (score, d) in enumerate(query_result))
    if result:
        return result
    else:
        return "No result found"

def format_query_result_law(query_result):
    result = "\n".join(f"[^{i+1}]:{d.content}" for i, (score, d) in enumerate(query_result))
    if result:
        return result
    else:
        return "No result found"