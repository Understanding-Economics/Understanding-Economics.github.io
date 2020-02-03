import React from 'react'
import DataView from './DataView'

export default class HistogramView extends React.Component { 
    constructor() {
        super();
        this.renderHistogram = this.renderHistogram.bind(this);
    }
    render() {
        if(!this.props.groupVal) {
            return null;
        }
        let headerText = "";
        return <DataView
                    elementId = "histogram"
                    survey = { this.props.survey }
                    data = { this.props.data }
                    selectedGroup = { this.props.selectedGroup }
                    selectedQuestion = { this.props.selectedQuestion }
                    header = { headerText }
                    renderFunction = { this.renderHistogram }
                />
    }

    renderHistogram(elementId, selectedGroup, selectedQuestion, data) {
        let dataNumeric = data.map(x => Number(x[selectedQuestion.id]));
        let cleanData = data.filter(x => x[selectedGroup.id] == this.props.groupVal)
                            .map(x => Number(x[selectedQuestion.id]));

        let nticks = 10; 
        let scale = d3.scaleLinear()
                        .domain([d3.min(dataNumeric), d3.max(dataNumeric)])
                        .range([d3.min(dataNumeric), d3.max(dataNumeric)]);

        let histogram = d3.histogram()
                            .domain(scale.domain())
                            .thresholds(scale.ticks(nticks));
        
        let bins = histogram(cleanData);
        let binSizes = bins.map(x => x.length);
        let categories = bins.map(bin => `${bin["x0"]}-${bin["x1"]}`);
        let chart = c3.generate({
                bindto: `#${elementId}`,
                data : {
                    columns : [['value', ... binSizes]],
                    types : { 
                        'value' : 'bar'
                    }
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
}