import pandas as pd
import os

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

skills_path = os.path.join(
    BASE_DIR,
    "data",
    "skills.csv"
)

skills_df = pd.read_csv(
    skills_path,
    header=None
)

SKILLS = [
    str(skill).strip().lower()
    for skill in skills_df[0].tolist()
]