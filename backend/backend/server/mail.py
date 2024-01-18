import os
import re
import yagmail

def send_email(to, subject, contents):
    yag = yagmail.SMTP(os.getenv("GMAIL_ADDR"), os.getenv("GMAIL_TOKEN"))
    yag.send(to=to, subject=subject, contents=contents)

def is_valid_email(email):
    pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
    return bool(re.match(pattern, email))