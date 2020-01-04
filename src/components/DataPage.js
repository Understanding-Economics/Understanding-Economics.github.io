import React from 'react'
import PropTypes from 'prop-types'
import CrossTabView from './CrossTabView'
import ChartView from './ChartView'
import { groups } from '../config/fields.json'

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
    render() {
        if (this.props.page == null) {
            throw new Error("Expected a page");
        }
        return (
            <div className = "container">
                <FieldSelect 
                    title = "Group"
                    description = "Select how you would like to group responses"
                    options = {Object.keys(groups).map(key => groups[key])}
                    selected = {this.state.selectedGroup}
                    handleSelect = {this.handleGroupSelect}
                />
                <FieldSelect
                    title = "Topic"
                    description = "Select a topic that you would like to examine"
                    options = {Object.keys(this.props.survey.topics).map(key => this.props.survey.topics[key])}
                    selected = {this.state.selectedTopic}
                    handleSelect = {this.handleTopicSelect}
                />
                <FieldSelect
                    title = "Question"
                    description = "Select a question to examine"
                    options = {this.state.selectedTopic ? 
                        getValues(this.props.survey[this.state.selectedTopic]) :
                        null
                    }
                    selected = {this.state.selectedQuestion}
                    handleSelect = {this.handleQuestionSelect}
                />
                <div className = "row">
                    <ChartView
                        survey = { this.props.survey } 
                        data = { this.state.surveyData }
                        selectedGroup = { this.state.selectedGroup }
                        selectedQuestion = { this.state.selectedQuestion } 
                    />
                </div>
                <div className = "row">
                    <CrossTabView
                        survey = { this.props.survey } 
                        data = { this.state.surveyData }
                        selectedGroup = { this.state.selectedGroup }
                        selectedQuestion = { this.state.selectedQuestion } 
                    />
                </div>
            </div>
        )
    }

    handleGroupSelect(event) {
        this.setState({
            selectedGroup : event.target.value
        })
    }

    handleTopicSelect(event) {
        this.setState({
            selectedTopic : event.target.value,
            selectedQuestion : undefined
        })
    }
    
    handleQuestiohnSelect(event) {
        this.setState({
            selectedQuestion : event.target.value
        })
    }
}

function getValues(dict) {
    return Object.keys(dict).map(key => dict[key])
}

DataPage.propTypes = {
    survey : PropTypes.object
}