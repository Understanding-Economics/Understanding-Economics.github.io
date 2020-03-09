import React from 'react'
import CrossTabView from './CrossTabView'
import ChartView from './ChartView'
import ChartLegend from './ChartLegend'

export default class CategoricalDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.receiveChart = this.receiveChart.bind(this);
    }
    render() {
        return (
            <div className = "CategoricalDisplay">
                <div className = "row header">
                    <h5>Proportion of responses to "<strong>{this.props.question.description}</strong>" by "<strong>{this.props.group.title}</strong>"</h5>
                </div>
                <div className = "row" style = {{paddingLeft:"20px"}}>
                    <ChartLegend 
                        data = { this.props.data }
                        question = { this.props.question }
                        charts = { [this.state.chart] }
                    />
                </div>
                <div className = "row">
                    <ChartView
                        survey = { this.props.survey } 
                        data = { this.props.data }
                        selectedGroup = { this.props.group }
                        selectedQuestion = { this.props.question }
                        receiveChart = { this.receiveChart }
                    />
                </div>
                <div className = "row">
                    <CrossTabView
                        survey = { this.props.survey } 
                        data = { this.props.data }
                        selectedGroup = { this.props.group }
                        selectedQuestion = { this.props.question }
                    />
                </div>
            </div>
        )
    }

    receiveChart(chart) {
        this.setState({
            chart : chart
        })
    }

    cleanData(data) {
        return data; 
    }
}