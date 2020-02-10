import React from 'react'
import CrossTabView from './CrossTabView'
import ChartView from './ChartView'

export default class CategoricalDisplay extends React.Component {
    render() {
        return (
            <div className = "CategoricalDisplay">
                <div className = "row header">
                    <h5>Average response to "<strong>{this.props.question.description}</strong>" by "<strong>{this.props.group.title}</strong>"</h5>
                </div>
                <div className = "row">
                    <ChartView
                        survey = { this.props.survey } 
                        data = { this.props.data }
                        selectedGroup = { this.props.group }
                        selectedQuestion = { this.props.question }
                    />
                </div>
                <div className = "row">
                    <CrossTabView
                        survey = { this.props.survey } 
                        data = { this.props.data }
                        selectedGroup = { this.props.group }
                        selectedQuestion = { this.props.question }
                    />
                </div>
            </div>
        )
    }

    cleanData(data) {
        return data; 
    }
}