import csv
import json
import sys
import itertools
def get_question_ids(survey):
    ids = ["mechanisms_rando"]
    flatten = lambda l: [item for sublist in l for item in sublist]
    questions = flatten([list(topic["questions"].values()) for topic in survey["topics"].values()])
    while len(questions) > 0:
        question = questions.pop(0)
        ids.append(question["id"])
    return sorted(list(set(ids)))

def get_group_ids(groups):
    return sorted([group["id"] for group in groups.values()])


def main():
    assert(len(sys.argv) >= 4)
    fields_filename = sys.argv[1]
    survey_id = sys.argv[2]
    csv_filename = sys.argv[3]
    with open(fields_filename, "r") as f:
        fields = json.load(f)
    survey = fields["surveys"][survey_id]
    groups = fields["groups"]
    question_ids = get_question_ids(survey)
    group_ids = get_group_ids(groups)
    ids = question_ids + group_ids
    with open(csv_filename, "r") as f:
        reader = csv.DictReader(f)
        filtered_rows = [{ i : row[i] for i in ids if i in row} for row in reader]
    with open(csv_filename, "w+") as f:
        writer = csv.DictWriter(f, ids)
        writer.writeheader()
        writer.writerows(filtered_rows)
    print(group_ids)
    print(ids)
    print(len(ids))

if __name__ == "__main__":
    fields_filename = sys.argv[1]