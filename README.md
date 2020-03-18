# Understanding Economics
This is a webapp developed for Professor Stefanie Stantcheva's research on teaching people economics and seeing how well people understand economic policies.

# Fields Schema
This details how the `fields.json` file organizes the surveys, topics, and questions. At the bottom is a JSON file schema that can be copied, pasted, and filled in with ease. 

```
{
    "groups" : {
        GROUP_ID : {
            "id" : GROUP_ID,
            "title" : GROUP_TITLE,
            "description" : "GROUP_DESCRIPTION",
            "type" : "CATEGORICAL",
            "sorter" " [GROUP_1, GROUP_2, GROUP_3] -- All answers must be listed exactly, case-sensitive
        }
    },
    "surveys" : {
        SURVEY_ID : {
            "title" : SURVEY_TITLE,
            "topics" : {
                TOPIC_ID : {
                    "id" : TOPIC_ID,
                    "title" : TOPIC_TITLE,
                    "description" : TOPIC_DESCRIPTION,
                    "questions" : {
                        QUESTION_ID : {
                            "id" : QUESTION_ID,
                            "title" : QUESTION_TITLE,
                            "description" : QUESTION_DESCRIPTION,
                            "type" : "CATEGORICAL" | "NUMERICAL" | "TREATMENT" | "WORDCLOUD" | "KEYNESS" | "MULTICHOICE",
                            "sorter" : [ANSWER_1, ANSWER_2, ANSWER_3],
                            "colors" : "SEE Colors.js" | [COLOR_1, COLOR_2, COLOR_3],
                            "correct" : CORRECT_ANSWER (OPTIONAL),
                            "source" : ANSWER_SOURCE (ONLY IF CORRECT_ANSWER),
                            "format" : "percent" | "dollar"
                            "questions" (TREATMENT ONLY) : [
                                {
                                    "id" : SUBQUESTION_ID,
                                    "title" : "CONTROL" | "YOU" | "GENDER",
                                    "description" : SUBQUESTION_DESCRIPTION,
                                    "treatments" : ["Neutral" | "You" | "Gender", ]

                                }
                            ]    
                        }
                    }
                }
            }
        }
    }
}
```
