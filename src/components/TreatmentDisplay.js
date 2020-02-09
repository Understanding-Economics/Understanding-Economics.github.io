import React from 'react'
import ChartView from './ChartView'
import ScrollableDesc from './ScrollableDesc'

export default class TreatmentDisplay extends React.Component { 
    render() {
        if(!this.props.question) {
            return null;
        }
        let chartViews = this.props.question.questions.map(question => 
            <div className = "col-md-4">
                <ScrollableDesc
                    title = {question.title}
                    content = {question.description}
                />
                <ChartView
                    survey = { this.props.survey } 
                    data = { this.props.data.filter(x => question.treatments.indexOf(x["mechanisms_rando"]) >= 0) }
                    selectedGroup = { this.props.group }
                    selectedQuestion = { question }
                    elementId = {`${question.id}_chart`}
                    headerText = {" "}
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