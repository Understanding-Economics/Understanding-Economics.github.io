import csv
import json
import sys

def fix_question(question):
    title : str = question["title"]
    if title.upper() != title: 
        title = list(title.lower())
        title[0] = title[0].upper()
        title = "".join(title)
        title = title.replace("U.s.", "U.S.")
        question["title"] = title.replace("?", "")


def get_all_questions(survey):
    flatten = lambda l: [item for sublist in l for item in sublist]
    all_questions = []
    questions = flatten([list(topic["questions"].items()) for topic in survey["topics"].values()])
    while len(questions) > 0:
        if type(questions[0]) is tuple:
            q_id, question = questions.pop(0)
            if q_id != question["id"]:
                print("ERROR: Id is not equal to dict key")
                print(question)
                raise Exception()
        else:
            question = questions.pop(0)
        if ("questions" in question):
            questions.extend(question["questions"])
        if "id" not in question:
            raise Exception(question)
        all_questions.append(question)
    return all_questions

def fix_survey(survey):
    questions = get_all_questions(survey)
    for question in questions:
        fix_question(question)
        print(question)

survey_ids = ["estate_survey", "health_survey", "income_survey", "trade_survey"]

if __name__ == "__main__":
    fields_filename = sys.argv[1]
    invalid_sorters = []
    with open(fields_filename, "r") as f:
        fields = json.load(f)
    for survey_id in survey_ids:
        survey = fields["surveys"][survey_id]
        fix_survey(survey)
    with open("formatted_fields.json", "w+") as f:
            json.dump(fields, f, indent=2)
