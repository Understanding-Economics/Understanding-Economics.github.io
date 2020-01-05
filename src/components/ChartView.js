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
        if(selectedQuestion.numeric) {
            $(`#${elementId}`).pivot(cleanData, 
                {
                    rows : [selectedGroup.id],
                    aggregator: $.pivotUtilities.aggregators["Average"](["response"]),
                    renderer: $.pivotUtilities.c3_renderers["Horizontal Bar Chart"],
                    rowOrder: "value_z_to_a"
                });
        }
        else { 
            $(`#${elementId}`).pivot(data, {
                rows : [selectedGroup.id],
                cols: [selectedQuestion.id],
                aggregator: $.pivotUtilities.aggregators["Count as Fraction of Rows"](),
                renderer: $.pivotUtilities.c3_renderers["Horizontal Stacked Bar Chart"],
                rowOrder: "value_z_to_a", colOrder: "value_z_to_a",
            });
            document.getElementById("chart").getElementsByTagName("p")[0].remove();
        }
    }
}