import React from 'react'
import DataView from './DataView'

export default class ChartView extends React.Component { 
    render() {
        return <DataView
                    elementId = "chart"
                    survey = { this.props.survey }
                    data = { this.props.data }
                    selectedGroup = { this.props.selectedGroup }
                    selectedQuestion = { this.props.selectedQuestion }
                    renderFunction = { this.renderChart }
                />
    }

    renderChart(elementId, selectedGroup, selectedQuestion, data) {
        console.log("rendering chart...");
        let cleanData = data.map(x => {
            let newX = {};
            newX[selectedGroup.title] = x[selectedGroup.id];
            newX["response"] = x[selectedQuestion.id] || " No response";
            return newX;
        })
        if(selectedQuestion.numeric) {
            $(`#${elementId}`).pivot(cleanData, 
                {
                    rows : [selectedGroup.title],
                    aggregator: $.pivotUtilities.aggregators["Average"](["response"]),
                    renderer: $.pivotUtilities.c3_renderers["Horizontal Bar Chart"],
                    rowOrder: "value_z_to_a"
                });
        }
        else { 
            $(`#${elementId}`).pivot(cleanData, {
                rows : [selectedGroup.title],
                cols: ["response"],
                aggregator: $.pivotUtilities.aggregators["Count as Fraction of Rows"](),
                renderer: $.pivotUtilities.c3_renderers["Horizontal Stacked Bar Chart"],
                rowOrder: "value_z_to_a", colOrder: "value_z_to_a",
            });
            document.getElementById("chart").getElementsByTagName("p")[0].remove();
        }
    }
}