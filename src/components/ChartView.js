import React from 'react'
import DataView from './DataView'
import Colors from '../Colors'
import '../css/ChartView.css'

export default class ChartView extends React.Component { 
    render() {
        return <DataView
                    elementId = {this.props.elementId || "chart"}
                    survey = { this.props.survey }
                    data = { this.props.data }
                    selectedGroup = { this.props.selectedGroup }
                    selectedQuestion = { this.props.selectedQuestion }
                    header = {this.props.headerText}
                    renderFunction = { this.renderChart.bind(this) }
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
        let colorPattern = selectedQuestion.color && typeof(selectedQuestion.color == "string") 
                            && selectedQuestion.color in Colors ? Colors[selectedQuestion.color] : selectedQuestion.color;

        
        $(`#${elementId}`).pivot(cleanData, {
            rows : [selectedGroup.title],
            cols: ["response"],
            aggregator: $.pivotUtilities.aggregators["Count as Fraction of Rows"](),
            renderer: $.pivotUtilities.c3_renderers["Horizontal Stacked Bar Chart"],
            sorters : sorters,
            rendererOptions : {
                c3 :{ 
                    size : {
                        width: $(`#${elementId}`).parent().width()
                    }, 
                    color : {
                        pattern : colorPattern || Colors.Categorical
                    },
                    ... this.props.c3Override,
                }
            }
        });
        for(let elt of document.getElementsByClassName("c3-axis-y-label")) {
            elt.innerHTML = "Proportion";
        }
        document.getElementById(elementId).getElementsByTagName("p")[0].remove();
    }
}