/* eslint no-undef: "off"*/
import React from 'react'
import DataView from './DataView'
import Colors from '../Colors'
import '../css/ChartView.css'
import Utils from '../Utils'
import merge from 'deepmerge'

export default class ChartView extends React.PureComponent { 
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
            return {
                [selectedGroup.id]: x[selectedGroup.id] || " No response",
                [selectedQuestion.id]: x[selectedQuestion.id] || " No response"
            };
        });
        let groupSorter = Utils.getGroupSorter(selectedGroup);
        let responseSorter = Utils.getQuestionSorter(selectedQuestion)
        let colorPattern = Utils.getColorPattern(selectedQuestion);
        let groupVals = ["All"].concat(Utils.getUniqueDictVals(cleanData, selectedGroup.id, groupSorter));
        let responseVals = Utils.getUniqueDictVals(cleanData, selectedQuestion.id, responseSorter);
        let proportions = {}
        for(let groupVal of groupVals) {
            proportions[groupVal] = Utils.getProportions(cleanData, selectedGroup.id, 
                groupVal, selectedQuestion.id, responseSorter); 
        }
        let chartData = responseVals.map(responseVal => {
            return [responseVal, ... groupVals.map(x => proportions[x][responseVal])]
        });

        const barWidth = 75;
        let chart = c3.generate(merge.all([{
            bindto: `#${elementId}`,
            data : { 
                columns: chartData,
                groups : [responseVals],
                type : "bar", 
                order: null
            },
            size : {
                width: $(`#${elementId}`).parent().width()
            }, 
            color : {
                pattern : colorPattern || Colors.Categorical
            },
            legend : {
                item : {
                    onclick : function() {}
                }, 
                show: false
            },
            padding : {
                left : 150
            },
            tooltip: {
                grouped : false
            }, 
            bar : {
                width:{ 
                    ratio: 0.75
                }

            }, 
            size : {
                height: groupVals.length * barWidth
            },
            axis : {
                rotated : true, 
                x : {
                    type: "category", 
                    categories: groupVals
                }, 
                y : {
                    // This is some hacky shit to get rid of the 110% display
                    max : 0.95,
                    label: "Proportion",
                    tick : {
                        format: d3.format(".0%")
                    }
                }
            },
        }, this.props.c3Override || {}]));
        for(let elt of document.getElementsByClassName("c3-axis-y-label")) {
            elt.innerHTML = "Proportion";
        }
        // document.getElementById(elementId).getElementsByTagName("p")[0].remove();

        if(selectedQuestion.correct != undefined) {
            let bars = document.getElementsByClassName(`c3-target-${selectedQuestion.correct.replace(" ", "-")}`);
            for(let i = 0; i < bars.length; i++){
                bars[i].style.setProperty("opacity", "1.0", "important");
            }
        }

        // some hacky stuff to handle the treatment chart views and adjust the label size.
        // should try to find some other way to deal with this at some point
        let ChartLabel = document.getElementById("ChartLabel");
        if (ChartLabel) {
            ChartLabel.style.height = document.getElementsByClassName("c3-event-rect")[0].height.baseVal.value + "px";
        }
        if(this.props.receiveChart) {
            this.props.receiveChart(chart); 
        }
    }
}