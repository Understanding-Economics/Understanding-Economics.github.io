import React from 'react'
import TreatmentChartView from './TreatmentChartView'
import ScrollableDesc from './ScrollableDesc'
import DummyChartView from './DummyChartView'

export default class TreatmentDisplay extends React.Component { 
    render() {
        if(!this.props.question) {
            return null;
        }
        let chartViews = this.props.question.questions.map(question => 
            <div className = "col-md">
                <ScrollableDesc
                    title = {question.title}
                    content = {question.description}
                    height = {"100px"}
                />
                <TreatmentChartView
                    survey = { this.props.survey } 
                    data = { this.props.data.filter(x => question.treatments.indexOf(x["mechanisms_rando"]) >= 0) }
                    selectedGroup = { this.props.group }
                    selectedQuestion = { question }
                    elementId = {`${question.title}_chart`}
                    headerText = {" "}
                />
            </div>
        )
        return(
            <div className = "row">
                <div className = "col-md-3">
                    <ScrollableDesc
                        title = {this.props.group.title }
                        content = {" "}
                        height = {"100px"}
                    /> 
                    <DummyChartView 
                        survey = { this.props.survey } 
                        data = { this.props.data }
                        selectedGroup = { this.props.group }
                        selectedQuestion = { this.props.question }
                        elementId = {`dummy_chart`}
                        headerText = {" "}
                    />
                </div>
                {chartViews}
            </div>
        )
    }
}