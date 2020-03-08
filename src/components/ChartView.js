/* eslint no-undef: "off"*/
import React from 'react'
import DataView from './DataView'
import Colors from '../Colors'
import '../css/ChartView.css'
import Utils from '../Utils'

export default class ChartView extends React.Component { 
    render() {
        return <DataView
                    elementId = {this.props.elementId || "chart"}
                    survey = { this.props.survey }
                    data = { this.props.data }
                    selectedGroup = { this.props.selectedGroup }
                    selectedQuestion = { this.props.selectedQuestion }
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

        let proportions = Utils.getProportions(data, selectedGroup.id, data[0][selectedGroup.id], selectedQuestion.id);
        console.log("PROPORTIONS: ");
        console.log(proportions);
        let allData = data.map(x => {
            return {
                [selectedGroup.title] : "All",
                "response" : x[selectedQuestion.id]
            }
        })
        let sorters = {
            [selectedGroup.title] : Utils.getGroupSorter(selectedGroup),
            "response" : Utils.getQuestionSorter(selectedQuestion)
        }
        /*if(selectedGroup.sorter) {
            sorters[selectedGroup.title] = (a, b) => {
                if (a == "All") return -1;
                if (b == "All") return 1;
                else $.pivotUtilities.sortAs(selectedGroup.sorter)(a, b);
            }
        }
        else {
            sorters[selectedGroup.title] = (a, b) => { 
                if (a == "All") return -1;
                if (b == "All") return 1;
                else a.localeCompare(b)
            }
        }
        if(selectedQuestion.sorter) {
            sorters["response"] = $.pivotUtilities.sortAs(selectedQuestion.sorter);
        }
        else {
            sorters["response"] = (a, b) => a.localeCompare(b);
        }*/
        let colorPattern = Utils.getColorPattern(selectedQuestion);

        
        $(`#${elementId}`).pivot([...allData, ...cleanData], {
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
                    legend : {
                        item : {
                            onclick : function() {}
                        }
                    },
                    axis : {
                        y : {
                            // This is some hacky shit to get rid of the 110% display
                            max : 0.95,
                            label: "Proportion",
                            tick : {
                                format: d3.format(".0%")
                            }
                        }
                    },
                    ... this.props.c3Override,
                }
            }
        });
        for(let elt of document.getElementsByClassName("c3-axis-y-label")) {
            elt.innerHTML = "Proportion";
        }
        document.getElementById(elementId).getElementsByTagName("p")[0].remove();
        let ChartLabel = document.getElementById("ChartLabel");
        if (ChartLabel) {
            ChartLabel.style.height = document.getElementsByClassName("c3-event-rect")[0].height.baseVal.value + "px";
        }
    }
}