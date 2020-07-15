import csv
import json
import sys

def csv_to_json(csvfile : str, jsonfile : str):
    with open(csvfile, "r") as infile:
        reader = csv.DictReader(infile)
        content = list(reader)
        with open(jsonfile, "w+") as outfile:
            json.dump(content, outfile)

folder = "src/json_data"
csvs = ["data_estate.csv", "data_health.csv", "data_income.csv", "data_trade.csv"]

for csv_file in csvs:
    csv_to_json(folder + "/" + csv_file, folder + "/" + csv_file.replace("csv", "json"))