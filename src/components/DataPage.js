import React from 'react'
import CrossTabView from './CrossTabView'
import ChartView from './ChartView'

export default class DataPage {
    render() {
        if (this.props.page == null) {
            throw new Error("Expected a page");
        }
        return (
            <div className = "container">
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
}