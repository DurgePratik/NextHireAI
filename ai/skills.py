import pandas as pd

skills_df = pd.read_csv(
    "data/skills.csv",
    header=None
)

SKILLS = [
    skill.strip().lower()
    for skill in skills_df[0].tolist()
]