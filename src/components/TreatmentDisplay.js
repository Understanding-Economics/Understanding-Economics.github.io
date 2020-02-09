import React from 'react'
import DataView from './DataView'

export default class TreatmentDisplay extends React.Component { 
    render() {
        if(!this.props.question) {
            return null;
        }
        let chartViews = this.props.question.questions.map(question => 
            <div className = "col-md">
                <ChartView
                    survey = { this.props.survey } 
                    data = { this.props.data.filter(x => x["mechanisms_rando"] in question.treatments) }
                    selectedGroup = { this.props.group }
                    selectedQuestion = { question }
                />
            </div>
        )
        return(
            <div>
                {chartViews}
            </div>
        )
    }
}