import React from 'react'
import PropTypes from 'prop-types'
import CrossTabView from './CrossTabView'
import ChartView from './ChartView'
import FieldSelect from './FieldSelect'
import { surveys, groups } from '../config/fields.json'

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
        this.survey = surveys[this.props.surveyId];
    }

    render() {
        if (this.props.surveyId == null) {
            throw new Error("Expected a survey id");
        }
        return (
            <div className = "container">
                <div className = "row">
                <div className = "col-md-6">
                    <FieldSelect 
                        title = "Group"
                        description = "Select how you would like to group responses"
                        options = { groups }
                        selected = {this.state.selectedGroup}
                        handleSelect = {this.handleGroupSelect}
                    />
                </div>
                <div className = "col-md-6">
                    <FieldSelect
                        title = "Topic"
                        description = "Select a topic that you would like to examine"
                        options = { this.survey.topics }
                        selected = {this.state.selectedTopic}
                        handleSelect = {this.handleTopicSelect}
                    />
                </div>
                <div className = "col-md-6">
                    <FieldSelect
                        title = "Question"
                        description = "Select a question to examine"
                        options = {this.state.selectedTopic ? 
                            this.survey.topics[this.state.selectedTopic].questions :
                            null
                        }
                        selected = {this.state.selectedQuestion}
                        handleSelect = {this.handleQuestionSelect}
                    />
                </div>
                </div>
                
                <div className = "row">
                    <ChartView
                        survey = { this.survey } 
                        data = { this.state.surveyData }
                        selectedGroup = { groups[this.state.selectedGroup] }
                        selectedQuestion = { this.state.selectedQuestion ? 
                            this.survey.topics[this.state.selectedTopic].questions[this.state.selectedQuestion] : null
                        } 
                    />
                </div>
                <div className = "row">
                    <CrossTabView
                        survey = { this.survey } 
                        data = { this.state.surveyData }
                        selectedGroup = { groups[this.state.selectedGroup] }
                        selectedQuestion = { this.state.selectedQuestion ? 
                            this.survey.topics[this.state.selectedTopic].questions[this.state.selectedQuestion] : null
                        } 
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        document.title = surveys[this.props.surveyId].title;
        d3.csv(`${process.env.PUBLIC_URL}/data/data_${this.props.surveyId}.csv`).then((data) => {
          this.setState({
            surveyData : data
          })
        });
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
    
    handleQuestionSelect(event) {
        this.setState({
            selectedQuestion : event.target.value
        })
    }
}

DataPage.propTypes = {
    survey : PropTypes.object
}