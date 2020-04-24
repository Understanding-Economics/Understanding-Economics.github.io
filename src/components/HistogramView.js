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
        let binSizes = bins.map(x => x.length);
        let categories = bins.map(bin => `${bin["x0"]}-${bin["x1"]}`);
        let correctBin = selectedQuestion.correct ? histogram([selectedQuestion.correct]).filter(x => x.length > 0)[0] : null;
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
                                    text : `Correct: ${this.props.formatter(selectedQuestion.correct)}`, 
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
            });
        }
        else {
            this.chart.load({
                columns : [['count', ... binSizes]]
            })
        }
    }
}