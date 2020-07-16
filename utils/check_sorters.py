import csv
import json
import sys

keywords = [
    ("data_estate", "estate_survey"),
    ("data_health", "health_survey") ,
    ("data_income",  "income_survey"),
    ("data_trade", "trade_survey")
]

def check_sorter(question, data):
    if question["id"] not in data[0]:
        return "Invalid id"
    if "sorter" not in question:
        return "No sorter"
    sorter = question["sorter"]
    question_data = [d[question["id"]].strip().replace('"', "") for d in data if len(d[question["id"]]) > 0]
    responses_set = set(question_data)
    sorter_set = set(sorter)
    if sorter_set != responses_set:
        print(question["id"])
        print(sorter_set)
        print(responses_set)
        return "Invalid sorter"
    return None

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

if __name__ == "__main__":
    fields_filename = sys.argv[1]
    data_path = sys.argv[2]
    invalid_sorters = []
    with open(fields_filename, "r") as f:
        fields = json.load(f)
    for filename, survey_id in keywords:
        survey = fields["surveys"][survey_id]
        with open(data_path + filename + ".json", "r") as f:
            data = json.load(f)
        for question in get_all_questions(survey):
            if check_sorter(question, data) == "Invalid sorter":
                invalid_sorters.append(survey_id + ", " + question["id"])
    with open(data_path + "invalid_sorters.json", "w+") as f:
            json.dump(invalid_sorters, f, indent=4)