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

// This is to cache the CSV data so that we are not consistently pinging the server for it.
var dataCache = {
    "income_survey" : incomeSurveyData,
    "trade_survey" : tradeSurveyData, 
    "estate_survey" : estateSurveyData,
    "health_survey" : healthSurveyData 
};

// Datatypes that should not allow groups
const noGroupTypes = [
    DataType.KEYNESS,
    DataType.WORDCLOUD,
    DataType.MULTICHOICE
]


export default class DataPage extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedGroup : undefined,
            selectedTopic : undefined,
            selectedQuestion : undefined
        }
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

    render() {
        console.log(this.survey)
        if(!this.survey) {
            return <NotFound />
        }
        return (
            <div className = "container-fluid">
                <div className = "row">
                    <div className = "col-md-4">
                        <FieldSelect
                            title = "Topic"
                            description = "Select a topic that you would like to examine"
                            options = { this.survey.topics }
                            selected = {this.state.selectedTopic ? this.state.selectedTopic.id : null}
                            handleSelect = {this.handleTopicSelect}
                        />
                    </div>
                    <div className = "col-md-4">
                        <FieldSelect
                            title = "Question"
                            description = "Select a question to examine"
                            options = {this.state.selectedTopic ? 
                                this.state.selectedTopic.questions :
                                null
                            }
                            selected = {this.state.selectedQuestion ? this.state.selectedQuestion.id : null}
                            handleSelect = {this.handleQuestionSelect}
                        />
                    </div>
                    <div className = "col-md-4">
                        {
                            this.displayGroupSelect() ?
                            <FieldSelect 
                                title = "Group by"
                                description = "Select how you would like to group responses"
                                options = { this.groups }
                                selected = {this.state.selectedGroup ? this.state.selectedGroup.id : null}
                                handleSelect = {this.handleGroupSelect}
                            />
                            : null
                        }
                    </div> 
                </div>
                
                <DataDisplay
                    data = { this.state.surveyData }
                    selectedGroup = { this.state.selectedGroup }
                    selectedQuestion = { this.state.selectedQuestion } 
                />
            </div>
        )
    }
    // decide whether to display the group
    displayGroupSelect() {
        console.log()
        if (!this.state.selectedTopic) {
            return false;
        }
        if(!this.state.selectedQuestion && !this.state.selectedGroup) {
            return false;
        }
        if (this.state.selectedQuestion && this.state.selectedQuestion.type && noGroupTypes.includes(this.state.selectedQuestion.type)){
            return false;
        } 
        return true
    }

    componentDidMount() {
        if(!this.survey){
            return;
        }
        document.title = this.survey.title;
        if(this.surveyId in dataCache) {
            this.setState({
                surveyData : dataCache[this.surveyId]
            });
        }
        else {
            d3.csv(`${process.env.PUBLIC_URL}/data/data_${this.surveyId}.csv`).then((data) => {
                dataCache[this.surveyId] = data; 
                this.setState({
                  surveyData : data
                })
              });
        }
      }

    handleGroupSelect(event) {
        this.setState({
            selectedGroup : this.groups[event.target.value]
        })
    }

    handleTopicSelect(event) {
        this.setState({
            selectedTopic : this.survey.topics[event.target.value],
            selectedQuestion : undefined,
            //selectedGroup : undefined
        })
    }
    
    handleQuestionSelect(event) {
        let selectedQuestion = this.state.selectedTopic.questions[event.target.value];
        this.setState({
            selectedQuestion : selectedQuestion,
            selectedGroup : noGroupTypes.includes(selectedQuestion.type) ?
                                null : this.state.selectedGroup
        })
    }
}

DataPage.propTypes = {
    survey : PropTypes.object
}