import csv
import json
import sys

def csv_to_json(csvfile : str, jsonfile : str):
    with open(csvfile, "r") as infile:
        reader = csv.DictReader(infile)
        content = list(reader)
        with open(jsonfile, "w+") as outfile:
            json.dump(content, outfile)

def main():
    assert(len(sys.argv) >= 3)
    csvfile = sys.argv[1]
    jsonfile = sys.argv[2]
    csv_to_json(csvfile, jsonfile)

if __name__ == "__main__":
    main()