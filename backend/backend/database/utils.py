from .schemas import Dialog, Lawyer


def to_timestamp(meeting_timestamp):
    import datetime
    date_object = datetime.datetime.strptime(meeting_timestamp, '%Y-%m-%d')
    return int(date_object.timestamp())


def format_dialogs(dialogs: list[Dialog]):
    return "\n".join([
        f"{d.speaker}: {d.content}"
        for d in dialogs
    ])

def format_summaries(summaries: list[str]):
    return "\n\n".join([f"Meeting {i+1}: {s}" for i, s in enumerate(summaries)])


def format_lawyer(lawyer: Lawyer):
    return f"""
{lawyer.name}
- Specialization: {lawyer.specialization}
- Introduction: {lawyer.introduction}
- Practice Areas: {', '.join(lawyer.practice_areas)}
""".strip()


def format_all_lawyers(lawyers: list[Lawyer]):
    return "\n\n".join([
        f"{i+1}. {format_lawyer(l)}"
        for i, l in enumerate(lawyers)
    ])


