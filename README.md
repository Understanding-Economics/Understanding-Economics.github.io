# Understanding Economics
This is a webapp developed for Professor Stefanie Stantcheva's research on teaching people economics and seeing how well people understand economic policies.

# Fields Schema
This details how the `fields.json` file organizes the surveys, topics, and questions. At the bottom is a JSON file schema that can be copied, pasted, and filled in with ease. 

## Data Types

### Categorical
The categorical dataype is used for any data that has a limited number of options (3-5 options typically). This includes questions that have different "levels" of responses.

### Numerical
These questions should have a "continuous" response, and have more possible responses than the categorical variables do. These are responses that would be best displayed in a histogram of some kind.

### Treatment
Treatment questions are categorical questions but where the question is asked in different ways based on the group. As a json object, the treatment question should be the overarching question, and there should be subquestions (in the `questions`) field, each of which is a categorical question and that specifies which treamtent(s) were received.

### Umbrella
These are questions that have subquestions that are closely related. The subquestions can be of any type, and umbrella questions are usually of the form "To what extent do you agree with each of the following...". 

### Wordcloud and Keyness
These are visualizations for handling free response questions. Right now, each of these should just display the description and a linked image. Notably, these do not have groups associated as they are aggregates. 

## Outline
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
