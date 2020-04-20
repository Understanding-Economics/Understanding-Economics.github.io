import React from 'react'
import CrossTabView from './CrossTabView'
import FrequencyChartView from './FrequencyChartView'
import '../css/CategoricalDisplay.css'

export default class FrequencyDisplay extends React.Component {
    render() {
        if(!this.props.question) {
            return null;
        }
        return (
            <div className = "FrequencyDisplay">
                <div className = "row header">
                    <h5>Distribution of responses to:<br/><strong>{this.props.question.description || this.props.question.title}</strong></h5>
                </div>
                <div className = "row">
                    <FrequencyChartView
                        survey = { this.props.survey } 
                        data = { this.props.data }
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