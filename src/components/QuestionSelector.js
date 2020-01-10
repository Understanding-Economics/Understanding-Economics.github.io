import React from 'react'
import PropTypes from 'prop-types'
import FieldSelect from './FieldSelect'

export default class QuestionSelector extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTopic : undefined,
            selectedQuestion : undefined
        }
        this.handleTopicSelect = this.handleTopicSelect.bind(this);
        this.handleQuestionSelect = this.handleQuestionSelect.bind(this); 
    }

    shouldComponentUpdate(nextProps, nextState) {
        let shouldUpdate = {... this.state} != {... nextState} || {... this.props} != {... nextProps};
        return shouldUpdate;
    }
    render() { 
        return (
            <div className = "col-md-6">
                <div className = "row">
                    <FieldSelect 
                        title = {this.props.topicTitle || "Topic"}
                        description = {this.props.topicDescription || "Select a topic to examine."}
                        options = { this.props.topics }
                        selected = { this.state.selectedTopic }
                        handleSelect = { this.handleTopicSelect }
                    />
                </div>
                <div className = "row">
                    <FieldSelect 
                            title = {this.props.questionTitle || "Question"}
                            description = {this.props.questionDescription || "Select a question to examine."}
                            options = {this.state.selectedTopic ? 
                                this.props.topics[this.state.selectedTopic].questions :
                                null
                            }
                            selected = { this.state.selectedQuestion }
                            handleSelect = { this.handleQuestionSelect }
                        />
                </div>
            </div>
        )
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
        }, () => {
            this.props.receiveSelection(this.props.topics[this.state.selectedTopic].questions[this.state.selectedQuestion]);
        });
    }
}

QuestionSelector.propTypes = {
    topics : PropTypes.object,
    receiveQuestion : PropTypes.func
}