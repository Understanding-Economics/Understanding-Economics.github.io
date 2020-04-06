# Understanding Economics
This is a webapp developed for Professor Stefanie Stantcheva's research on teaching people economics and seeing how well people understand economic policies.

# Fields Schema
This details how the `fields.json` file organizes the surveys, topics, and questions. At the bottom is a JSON file schema that can be copied, pasted, and filled in with ease. 

## Data Types

### All
Some fields are common to all of the datatype.

#### id
The `id` field should be a `string` mapping to the question id in the data. This should match the key of the object in the questions dictionary. This will not be seen by the user and must be case-sensitve.

#### title
The `title` is a `string` will be displayed to the user to select from. It should be relatively short (less than 20 characters).

#### description
The `description` is a `string` that is displayed to the user and represents a longer explanation of the question. Typically this is the question text.

#### type
The `type` of the question is a `string` that represents what type of question it is. It should be in all caps, and should be one of the following:
* `CATEGORICAL`
* `NUMERIC`
* `TREATMENT`
* `UMBRELLA`
* `WORDCLOUD`
* `KEYNESS`

#### sorter
The `sorter` is a `list` of `string`s with the the possible options in the order in which they should be displayed. Each option must be exactly the same (case-sensitive, no additional spaces), as the options in the data. 


### Categorical
The categorical dataype is used for any data that has a limited number of options (3-5 options typically). This includes questions that have different "levels" of responses.


#### color
The `color` can be either a `list` or a `string` representing the colors of the categories for the options. If it is a list, it should be a list of `string`s with color hex codes. If it is a `string`, it will be a key lookup mapping to a color in the `Colors.js` file. 

### Numeric
These questions should have a "continuous" response, and have more possible responses than the categorical variables do. These are responses that would be best displayed in a histogram of some kind.

#### correct
This is a `number` representing the correct answer to the question. 

#### source
This is a `string` denoting the source of the correct answer. If this is filled, the `correct` answer field must also be filled.

#### format
This is a `string` to tell the format of the numbers. The formats are typically `percent` or `dollar`, and all the formats are listed in `NumerFormats.js`.

### Treatment
Treatment questions are categorical questions but where the question is asked in different ways based on the group. As a json object, the treatment question should be the overarching question, and there should be subquestions (in the `questions`) field, each of which is a categorical question and that specifies which treamtent(s) were received.


#### questions
Each treatment must have a `questions` field that is a list of other categorical question objects. Each must have an `id` which maps to the question, as well as a `title` and a `description`. The `title` is typically the name of the treatment. The sorter and the colors fields are propogated from the parent question, and are not needed in each subquestion. 

##### treatments
Within each subquestion of the treatments, there should be a `list` of `string`s that represent the treatments that are applied to that question. Typically, this is either `["Neutral]`, `["You"]`, or `["Gender]`.

### Umbrella
These are questions that have subquestions that are closely related. The subquestions can be of any type, and umbrella questions are usually of the form "To what extent do you agree with each of the following...". 

#### questions
This is a `list` of questions that are underneath the umbrella question. Each object in this list should be a full blown question object. 

### Wordcloud and Keyness
These are visualizations for handling free response questions. Right now, each of these should just display the description and a linked image. Notably, these do not have groups associated as they are aggregates. 

#### img_url
This should be a `string` with the full file name of the image that should be presented. These are relative to the `public` folder.

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
