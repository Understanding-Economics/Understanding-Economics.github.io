import React from 'react'
import CrossTabView from './CrossTabView'
import ChartView from './ChartView'
import ChartLegend from './ChartLegend'
import CorrectDisplay from './CorrectDisplay'
import '../css/CategoricalDisplay.css'

export default class CategoricalDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showTable : false
        }
        this.receiveChart = this.receiveChart.bind(this);
    }
    render() {
        if(!this.props.question || !this.props.group) {
            return null;
        }
        return (
            <div className = "CategoricalDisplay">
                <div className = "row header">
                    <h5>Proportion of responses to:<br/><strong>{this.props.question.description || this.props.question.title}</strong> <br/> <br/> 
                    By <strong>{this.props.group.title}</strong></h5>
                </div>
                <div className = "row">
                    <CorrectDisplay question = {this.props.question} />
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

                <div className = "row text-center">
                    <button onClick = {this.toggleTable.bind(this)} className = "card toggleButton">
                        {this.state.showTable ? "Hide" : "Show"} answer distribution table
                    </button>
                </div>
                <div className = "row" style = {{minHeight: "50px", marginBottom: "30px"}}>
                    { this.state.showTable ? 
                        <CrossTabView
                            survey = { this.props.survey } 
                            data = { this.props.data }
                            selectedGroup = { this.props.group }
                            selectedQuestion = { this.props.question }
                        /> : null
                    } 
                </div>
            </div>
        )
    }

    receiveChart(chart) {
        this.setState({
            chart : chart
        })
    }

    toggleTable() {
        this.setState ({ 
            showTable : !this.state.showTable
        });
    }

    cleanData(data) {
        return data; 
    }
}