import React from 'react'
import TreatmentChartView from './TreatmentChartView'
import ScrollableDesc from './ScrollableDesc'
import DummyChartView from './DummyChartView'
import ChartLegend from './ChartLegend'
import Utils from '../Utils';

export default class TreatmentDisplay extends React.Component { 
    render() {
        if(!this.props.question) {
            return null;
        }
        let chartViews = this.props.question.questions.map(question => 
            <div className = "col-md">
                <TreatmentChartView
                    survey = { this.props.survey } 
                    data = { this.props.data.filter(x => question.treatments.indexOf(x["mechanisms_rando"]) >= 0) }
                    selectedGroup = { this.props.group }
                    selectedQuestion = { {color: this.props.question.color, sorter: this.props.question.sorter, ...question} }
                    elementId = {`${question.title}_chart`}
                />
            </div>
        )

        let colorPattern = Utils.getColorPattern(this.props.question);

        let descriptions = this.props.question.questions.map(question => 
            <div className = "col-md">
                <ScrollableDesc
                    title = {question.title}
                    content = {question.description}
                    height = {"100px"}
                />
            </div>
            )
        return(
            <div className = "TreatmentDisplay">
                <div className = "row">
                    <div className = "col-md-3">
                        <ScrollableDesc
                            title = {this.props.group.title }
                            content = {" "}
                            height = {"100px"}
                        /> 
                    </div>
                    {descriptions}
                </div>
                <div className = "row">
                    <div className = "col-md"></div>
                    <div className = "col-md-9">
                        <ChartLegend 
                            data = { this.props.data }
                            question = { this.props.question }
                        />
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-md-3">
                        <DummyChartView 
                            survey = { this.props.survey } 
                            data = { this.props.data }
                            selectedGroup = { this.props.group }
                            selectedQuestion = { this.props.question }
                            elementId = {`dummy_chart`}
                        />
                    </div>
                    {chartViews}
                </div>
            </div>
        )
    }
}