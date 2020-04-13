import csv
import json
import sys

keywords = [
    ("data_estate", "estate_survey"),
    ("data_health", "health_survey") ,
    ("data_income",  "income_survey"),
    ("data_trade", "trade_survey")
]

def get_question_ids(survey):
    ids = ["mechanisms_rando"]
    flatten = lambda l: [item for sublist in l for item in sublist]
    questions = flatten([list(topic["questions"].values()) for topic in survey["topics"].values()])
    while len(questions) > 0:
        question = questions.pop(0)
        if ("questions" in question):
            questions.extend(question["questions"])
        ids.append(question["id"])
    return sorted(list(set(ids)))

def get_group_ids(groups):
    return sorted([group["id"] for group in groups.values()])

def filtered_csv_to_json(csv_filename, json_filename, ids):
    invalid_ids = []
    with open(csv_filename, "r") as f:
        reader = csv.DictReader(f)
        filtered_rows = [{ i : row[i] for i in ids if i in row} for row in reader]
        for i in ids:
            if i not in filtered_rows[0]:
                invalid_ids.append(i)
    with open(json_filename, "w+") as f:
        json.dump(filtered_rows, f)
    return invalid_ids

if __name__ == "__main__":
    fields_filename = sys.argv[1]
    data_path = sys.argv[2]
    with open(fields_filename, "r") as f:
        fields = json.load(f)
    for filename, survey_id in keywords:
        survey = fields["surveys"][survey_id]
        groups = fields["groups"]
        question_ids = get_question_ids(survey)
        group_ids = get_group_ids(groups)
        ids = question_ids + group_ids
        invalid_ids = filtered_csv_to_json(data_path + filename + ".csv", data_path + filename + ".json", ids)
        with open(survey_id + "_invalid_ids.json", "w+") as f:
            json.dump(invalid_ids, f)
