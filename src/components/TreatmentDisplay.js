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
        // Ugh, more hacky shit. 
        // Basically we need to adjust the column size based on how many treatment groups there are
        // But bootstrap is too stupid to figure it out by itself
        let columnWidth = `col-md-${10 - 2 * this.props.question.questions.length}`;
        let chartViews = this.props.question.questions.map(question => 
            <div className = {columnWidth}>
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
            <div className = {columnWidth}>
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
                    <div className = "col-md-9">
                        <div className = "row">
                            {descriptions}
                        </div>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-md-3"></div>
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
                    <div className = "col-md-9">
                        <div className = "row">
                            {chartViews}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}