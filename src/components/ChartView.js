import React from 'react'
import DataView from './DataView'

export default class ChartView extends React.Component { 
    render() {
        let headerText = null
        if (this.props.selectedQuestion) {
            // headerText = `${this.props.selectedQuestion.numeric ? "Average" : "Proportions"} of responses to "${this.props.selectedQuestion.title}" by "${this.props.selectedGroup.title}"`
            headerText = `Each bar in the chart shows, for each group list on the left, the ${this.props.selectedQuestion.numeric ? "average" : "share"} of responses to the question.`
        }
        return <DataView
                    elementId = "chart"
                    survey = { this.props.survey }
                    data = { this.props.data }
                    selectedGroup = { this.props.selectedGroup }
                    selectedQuestion = { this.props.selectedQuestion }
                    header = {headerText}
                    renderFunction = { this.renderChart }
                />
    }

    renderChart(elementId, selectedGroup, selectedQuestion, data) {
        let cleanData = data.map(x => {
            let newX = {};
            newX[selectedGroup.title] = x[selectedGroup.id] || " No response"
            newX["response"] = x[selectedQuestion.id] || " No response";
            return newX;
        })
        let sorters = {}
        if(selectedGroup.sorter) {
            sorters[selectedGroup.title] = $.pivotUtilities.sortAs(selectedGroup.sorter);
        }
        else {
            sorters[selectedGroup.title] = (a, b) => a.localeCompare(b);
        }
        if(selectedQuestion.sorter) {
            sorters["response"] = $.pivotUtilities.sortAs(selectedQuestion.sorter);
        }
        else {
            sorters["response"] = (a, b) => a.localeCompare(b);
        }

        if(selectedQuestion.numeric) {
            $(`#${elementId}`).pivot(cleanData, 
                {
                    rows : [selectedGroup.title],
                    aggregator: $.pivotUtilities.aggregators["Average"](["response"]),
                    renderer: $.pivotUtilities.c3_renderers["Horizontal Bar Chart"],
                    sorters : sorters,
                    rendererOptions : {
                        c3 : {
                            data : { 
                                names : {
                                    Count : "Average"
                                },
                            },
                            legend : {
                                show: true
                            }
                        }
                    }
                });
            document.getElementsByClassName("c3-axis-y-label")[0].innerHTML = "Average";
        }
        else { 
            $(`#${elementId}`).pivot(cleanData, {
                rows : [selectedGroup.title],
                cols: ["response"],
                aggregator: $.pivotUtilities.aggregators["Count as Fraction of Rows"](),
                renderer: $.pivotUtilities.c3_renderers["Horizontal Stacked Bar Chart"],
                sorters : sorters
            });
            document.getElementsByClassName("c3-axis-y-label")[0].innerHTML = "Proportion";
        }
        document.getElementById("chart").getElementsByTagName("p")[0].remove();
    }
}