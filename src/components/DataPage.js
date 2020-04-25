/* eslint no-undef: "off"*/
import React from 'react'
import PropTypes from 'prop-types'
import FieldSelect from './FieldSelect'
import { surveys, groups } from '../config/fields.json'
import NotFound from './NotFound'
import DataDisplay from './DataDisplay'
import incomeSurveyData from './../json_data/data_income.json'
import tradeSurveyData from './../json_data/data_trade.json'
import estateSurveyData from './../json_data/data_estate.json'
import healthSurveyData from './../json_data/data_health.json'
import DataType from '../DataType'

function addSurveyType(data, survey_id) {
    data.forEach(x => x["survey"] = survey_id)
}

addSurveyType(incomeSurveyData, "Income Tax");
addSurveyType(tradeSurveyData, "Trade Policy");
addSurveyType(estateSurveyData, "Estate Tax");
addSurveyType(healthSurveyData, "Health Insurance");

const surveyData = {
    "income_survey" : incomeSurveyData,
    "trade_survey" : tradeSurveyData, 
    "estate_survey" : estateSurveyData,
    "health_survey" : healthSurveyData,
    "pooled" : incomeSurveyData.concat(tradeSurveyData, estateSurveyData, healthSurveyData)
};


// Datatypes that should not allow groups
const noGroupTypes = [
    DataType.KEYNESS,
    DataType.WORDCLOUD,
    DataType.MULTICHOICE,
    DataType.FREQUENCY
]


export default class DataPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.params = new URLSearchParams(props.history.search); 
        this.updateURL = this.updateURL.bind(this);
        this.handleGroupSelect = this.handleGroupSelect.bind(this);
        this.handleTopicSelect = this.handleTopicSelect.bind(this);
        this.handleQuestionSelect = this.handleQuestionSelect.bind(this); 
    }
    componentWillMount() {
        this.surveyId = this.props.surveyId;
        if (this.surveyId && this.surveyId in surveys) {
            this.survey = surveys[this.surveyId];
        }
        this.groups = {...groups, ... (this.survey.additionalGroups || {})}
    }

    componentDidMount() {
        document.title = `${this.survey.title} - Understanding Economics`;
    }

    render() {
        if(!this.survey) {
            return <NotFound />
        }
        this.params = new URLSearchParams(this.props.history.location.search); 
        let selectedGroup = this.getGroup();
        let selectedTopic = this.getTopic();
        let selectedQuestion = this.getQuestion();

        return (
            <div className = "container-fluid">
                <div className = "row">
                    <div className = "col-md-4">
                        <FieldSelect
                            title = "Topic"
                            description = "Select a topic that you would like to examine"
                            options = { this.survey.topics }
                            selected = {selectedTopic ? selectedTopic.id : null}
                            handleSelect = {this.handleTopicSelect}
                        />
                    </div>
                    <div className = "col-md-4">
                        <FieldSelect
                            title = "Question"
                            description = "Select a question to examine"
                            options = {selectedTopic ? 
                                selectedTopic.questions :
                                null
                            }
                            selected = {selectedQuestion ? selectedQuestion.id : null}
                            handleSelect = {this.handleQuestionSelect}
                        />
                    </div>
                    <div className = "col-md-4">
                        {
                            this.displayGroupSelect(selectedTopic, selectedQuestion, selectedGroup) ?
                            <FieldSelect 
                                title = "Group by"
                                description = "Select how you would like to group responses"
                                options = { this.groups }
                                selected = {selectedGroup ? selectedGroup.id : null}
                                handleSelect = {this.handleGroupSelect}
                            />
                            : null
                        }
                    </div> 
                </div>
                <div style={{minHeight: 500}}>
                    <DataDisplay
                        data = { surveyData[this.surveyId] }
                        selectedGroup = { selectedGroup }
                        selectedQuestion = { selectedQuestion } 
                    />
                </div>
            </div>
        )
    }
    // decide whether to display the group
    displayGroupSelect(selectedTopic, selectedQuestion, selectedGroup) {
        console.log()
        if (!selectedTopic) {
            return false;
        }
        if(!selectedQuestion && !selectedGroup) {
            return false;
        }
        if (selectedQuestion && selectedQuestion.type && noGroupTypes.includes(selectedQuestion.type)){
            return false;
        } 
        return true
    }

    updateURL() {
        this.props.history.push({
            search : this.params.toString()
        })
    }

    handleGroupSelect(value) {
        this.params.set("group", this.groups[value].id)
        this.updateURL();
    }

    handleTopicSelect(value) {
        console.log(event.target.value);
        this.params.set("topic", this.survey.topics[value].id);
        this.params.delete("question")
        this.updateURL();
    }

    
    handleQuestionSelect(value) {
        let selectedQuestion = this.getTopic().questions[value];
        let selectedGroup = noGroupTypes.includes(selectedQuestion.type) ?
        null : this.getGroup();
        this.params.set("question", selectedQuestion.id);
        if(selectedGroup) {
            this.params.set("group", selectedGroup.id);
        }
        else {
            this.params.delete("group");
        }
        this.updateURL();
    }

    getTopic() { 
        let selectedTopicId = this.params.get("topic");
        return selectedTopicId in this.survey.topics ? this.survey.topics[selectedTopicId] : undefined;
    }
    
    getGroup() {
        let selectedGroupId = this.params.get("group");
        return selectedGroupId in this.groups ? this.groups[selectedGroupId] : undefined;
    }

    getQuestion() {
        let selectedTopic = this.getTopic();
        let selectedQuestionId = this.params.get("question");
        return selectedTopic && selectedQuestionId in selectedTopic.questions ? selectedTopic.questions[selectedQuestionId] : undefined;
    }
}

DataPage.propTypes = {
    survey : PropTypes.object
}