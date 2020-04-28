/* eslint no-undef: "off"*/
import React from 'react'
import DataView from './DataView'
import Colors from '../Colors'
import '../css/HistogramView.css'

export default class HistogramView extends React.Component { 
    constructor() {
        super();
        this.renderHistogram = this.renderHistogram.bind(this);
    }
    render() {
        return (
        <div style={{width: "100%"}}> 
            <h5 className = "text-center">
                Distribution of responses by group: <strong>{this.props.groupVal}</strong>
            </h5>
            <DataView
                elementId = "histogram"
                survey = { this.props.survey }
                data = { this.props.data }
                selectedGroup = { this.props.selectedGroup }
                selectedQuestion = { this.props.selectedQuestion }
                renderFunction = { this.renderHistogram }
            />
        </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState) { 
        if(nextProps.selectedGroup != this.props.selectedGroup || nextProps.selectedQuestion != this.props.selectedQuestion) {
            this.chart = null;
        }
        return true;
    }

    renderHistogram(elementId, selectedGroup, selectedQuestion, data) {
        let dataNumeric = data.map(x => Number(x[selectedQuestion.id]));
        let cleanData = data.filter(x => this.props.groupVal === "All" || x[selectedGroup.id] == this.props.groupVal)
                            .map(x => Number(x[selectedQuestion.id]));

        let nticks = selectedQuestion.nticks ? selectedQuestion.nticks : 15;
        let correctList = selectedQuestion.correct ? [selectedQuestion.correct] : [];
        let dataWithCorrect = dataNumeric.concat(correctList);
        let minValue = selectedQuestion.min_val || d3.min(dataWithCorrect);
        let maxValue = selectedQuestion.max_val || d3.max(dataWithCorrect)
        let scale = d3.scaleLinear()
                        .domain([minValue, maxValue])
                        .range([minValue, maxValue]);

        let histogram = d3.histogram()
                            .domain([minValue, maxValue])
                            .thresholds(scale.ticks(nticks));
        
        let bins = histogram(cleanData);
        for(var i = 0; i < bins.length - 1; i++){
            bins[i]["x1"] -= 1;
        }
        let binSizes = bins.map(x => x.length);
        if (bins[bins.length - 1]["x0"] == bins[bins.length - 1]["x1"]) {
            binSizes[bins.length - 2] += binSizes[bins.length - 1];
            bins[bins.length - 2]["x1"] = bins[bins.length - 1]["x0"];
            bins.pop();
            binSizes.pop();
        }
        else {
            bins[bins.length - 1]["x1"] = bins[bins.length - 1]["x0"] + (bins[bins.length - 2]["x1"] - bins[bins.length - 2]["x0"]) + 1;
        }
        let categories = bins.map(bin => `${bin["x0"]}-${bin["x1"]}`);
        let correctBin = selectedQuestion.correct ? bins.filter(bin => selectedQuestion.correct >= bin["x0"] && selectedQuestion.correct <= bin["x1"])[0] : null;
        if(!this.chart) {
            this.chart = c3.generate({
                bindto: `#${elementId}`,
                data : {
                    columns : [['count', ... binSizes]],
                    types : { 
                        'count' : 'bar'
                    }
                },
                grid : {
                    x: {
                        lines : (correctBin ? 
                                [{
                                    value : `${correctBin["x0"]}-${correctBin["x1"]}`, 
                                    text : `Correct: ${selectedQuestion.correct_text || this.props.formatter(selectedQuestion.correct)}`, 
                                    class: "correct_line",
                                    position: "middle", 
                                }
                                ] : [])
                    },
                },
                color : {
                    pattern : Colors.Histogram
                }, 
                axis : {
                    x : {
                        type : 'category',
                        categories : categories
                    }
                },
                bar: {
                    width: {
                        ratio: 1
                    }
                },
                legend : {
                    show : false
                }
            });
        }
        else {
            this.chart.load({
                columns : [['count', ... binSizes]]
            })
        }
    }
}