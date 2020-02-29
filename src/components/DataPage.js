import React from 'react'
import PropTypes from 'prop-types'
import FieldSelect from './FieldSelect'
import { surveys, groups } from '../config/fields.json'
import NotFound from './NotFound'
import DataDisplay from './DataDisplay'
import VariableDescription from './VariableDescription'
import incomeSurveyData from './../json_data/data_income_survey.json'

// This is to cache the CSV data so that we are not consistently pinging the server for it.
var dataCache = {
    "income_survey" : incomeSurveyData
};
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
                        <FieldSelect 
                            title = "Group"
                            description = "Select how you would like to group responses"
                            options = { this.state.selectedTopic ? this.groups : null }
                            selected = {this.state.selectedGroup ? this.state.selectedGroup.id : null}
                            handleSelect = {this.handleGroupSelect}
                        />
                    </div>
                </div>
                
                <DataDisplay
                    survey = { this.survey } 
                    data = { this.state.surveyData }
                    selectedGroup = { this.state.selectedGroup }
                    selectedQuestion = { this.state.selectedQuestion } 
                />
            </div>
        )
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
        this.setState({
            selectedQuestion : this.state.selectedTopic.questions[event.target.value]
        })
    }
}

DataPage.propTypes = {
    survey : PropTypes.object
}