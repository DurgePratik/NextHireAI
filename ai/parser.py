import fitz
import re

from skills import SKILLS


def extract_text(pdf_path):
    text = ""

    doc = fitz.open(pdf_path)

    for page in doc:
        text += page.get_text()

    return text


def extract_skills(text):

    text = text.lower()

    found_skills = []

    for skill in SKILLS:

        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, text):
            found_skills.append(skill)

    return list(set(found_skills))


def parse_resume(pdf_path):

    text = extract_text(pdf_path)

    skills = extract_skills(text)

    return {
        "skills": skills,
        "text": text[:1000]
    }


def parse_job_description(text):

    skills = extract_skills(text)

    return {
        "skills": skills
    }


def calculate_match_score(
    candidate_skills,
    job_skills
):

    if len(job_skills) == 0:
        return 0

    candidate_set = set(
        [
            skill.lower()
            for skill in candidate_skills
        ]
    )

    job_set = set(
        [
            skill.lower()
            for skill in job_skills
        ]
    )

    matched = candidate_set.intersection(job_set)

    score = (
        len(matched)
        / len(job_set)
    ) * 100

    return round(score, 2)