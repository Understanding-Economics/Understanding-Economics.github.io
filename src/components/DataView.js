import React, { Component } from 'react'

export default class DataView extends Component {
    render() {
        return (
            <div id = {this.props.elementId}></div>
        )
    }

    componentDidUpdate() {
        let selectedGroup = this.props.selectedGroup;
        let selectedQuestion = this.props.selectedQuestion; 
        let data = this.props.data; 
        let survey = this.props.survey; 
        let renderFunction = this.props.renderFunction;
        if (selectedGroup && selectedQuestion && data) {
            renderFunction(this.props.elementId, selectedGroup, selectedQuestion, data, survey);
        }
    }
}