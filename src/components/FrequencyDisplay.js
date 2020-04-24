import React from 'react'
import FrequencyChartView from './FrequencyChartView'
import '../css/CategoricalDisplay.css'
import fields from '../config/fields.json'
import StatBubble from './StatBubble'

export default class FrequencyDisplay extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedSurvey : "All"
        };
    }
    render() {
        if(!this.props.question) {
            return null;
        }
        let surveyNames = ["All", "Income Tax", "Estate Tax", "Health Insurance", "Trade Policy"];
        let bubbles = surveyNames.map(survey => 
            <div className = "col-md-3" style={{marginBottom : "10px"}}>
                <StatBubble 
                    title = { survey }
                    active = { survey == this.state.selectedSurvey}
                    handleClick = { (() => this.setState({selectedSurvey : survey})).bind(this) }
                />
            </div>
        );
        
        let filteredData = this.props.data.filter(x => this.state.selectedSurvey == "All" ||
                                                    x.survey == this.state.selectedSurvey);
        return (
            <div className = "FrequencyDisplay">
                <div className = "row header">
                    <h5>Distribution of responses to:
                    <br/><strong>{this.props.question.description || this.props.question.title}</strong>
                    <br/> <br/>
                    Among {this.state.selectedSurvey.toLowerCase()} respondents. 
                    </h5>
                </div>
                <div className = "row">
                    { bubbles }
                </div>
                <div className = "row">
                    <FrequencyChartView
                        survey = { this.props.survey } 
                        data = { filteredData }
                        selectedQuestion = { this.props.question }
                    />
                </div>
            </div>
        )
    }

    cleanData(data) {
        return data; 
    }
}