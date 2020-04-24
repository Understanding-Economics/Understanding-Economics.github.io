/* eslint no-undef: "off"*/
import React from 'react'
import DataView from './DataView'
import Colors from '../Colors'
import '../css/ChartView.css'
import Utils from '../Utils'
import merge from 'deepmerge'

export default class FrequencyChartView extends React.PureComponent { 
    render() {
        return <DataView
                    elementId = {this.props.elementId || "chart"}
                    survey = { this.props.survey }
                    data = { this.props.data }
                    selectedQuestion = { this.props.selectedQuestion }
                    renderFunction = { this.renderChart.bind(this) }
                />
    }

    renderChart(elementId, selectedGroup, selectedQuestion, data) {
        console.log("Rendering");
        let cleanData = data.map(x => {
            return {
                [selectedQuestion.id]: x[selectedQuestion.id] || " No response"
            };
        });
        let responseSorter = Utils.getQuestionSorter(selectedQuestion)
        let colorPattern = Utils.getColorPattern(selectedQuestion);
        let responseVals = Utils.getUniqueDictVals(cleanData, selectedQuestion.id, responseSorter);
        let counts = Utils.getCounts(data, selectedQuestion.id);

        console.log(counts);
        const barWidth = 75;
        let chart = c3.generate(merge.all([{
            bindto: `#${elementId}`,
            data : { 
                columns: [
                    ["count", ... responseVals.map(x => counts[x])]
                ],
                type : "bar", 
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
                left : 200
            },
            tooltip: {
                grouped : false
            }, 
            bar : {
                width:{ 
                    ratio: 0.9
                }
            }, 
            size : {
                height: responseVals.length * barWidth
            },
            axis : {
                rotated : true, 
                x : {
                    type: "category", 
                    categories: responseVals
                }
            },
        }, this.props.c3Override || {}]));
    }
}