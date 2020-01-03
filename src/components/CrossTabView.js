import React, { Component } from 'react'
import DataView from './DataView'

export default class CrossTabView extends Component{
    render() {
        return <DataView 
                    elementId = "crosstab" 
                    survey = { this.props.survey }
                    data = { this.props.data }
                    selectedGroup = { this.props.selectedGroup }
                    selectedQuestion = { this.props.selectedQuestion }
                    renderFunction = { this.renderCrossTabs }
                />
    }

    renderCrossTabs(elementId, selectedGroup, selectedQuestion, data, survey) {
        let cleanData = data.map((x) => { return {group : x[selectedGroup], response : x[selectedQuestion] || " No Response"} });
        console.log(cleanData);
        if(survey.questions[selectedQuestion].numeric) {
            $(`#${elementId}`).pivot(cleanData, 
                {
                    rows : ["group"],
                    aggregator: $.pivotUtilities.aggregators["Average"](["response"])
                });
        }
        else {
            $(`#${elementId}`).pivot(cleanData, 
                {
                    rows : ["group"],
                    cols: ["response"],
                    aggregator: $.pivotUtilities.aggregators["Count"]()
                });
        }
    }
}