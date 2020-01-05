import React from 'react'
import DataView from './DataView'

export default class CrossTabView extends React.Component {
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

    renderCrossTabs(elementId, selectedGroup, selectedQuestion, data) {
        console.log(`SELECTED GROUP: ${selectedGroup}`);
        console.log(`SELECTED QUESTION: ${selectedQuestion}`);
        let cleanData = data.map((x) => { return {group : x[selectedGroup.id], response : x[selectedQuestion.id] || " No Response"} });
        console.log(cleanData);
        if(selectedQuestion.numeric) {
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