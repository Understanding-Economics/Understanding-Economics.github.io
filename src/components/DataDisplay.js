import React from 'react'
import ChartView from './ChartView'
import CrossTabView from './CrossTabView'

export default class DataDisplay extends React.Component {

    render() {
        return (
            <div>
                <div className = "row">
                    <ChartView
                        survey = { this.props.survey } 
                        data = { this.props.data }
                        selectedGroup = { this.props.selectedGroup }
                        selectedQuestion = { this.props.selectedQuestion }
                    />
                    </div>
                    <div className = "row">
                        <CrossTabView
                            survey = { this.props.survey } 
                            data = { this.props.surveyData }
                            selectedGroup = { this.props.selectedGroup }
                            selectedQuestion = { this.props.selectedQuestion }
                        />
                    </div>
            </div>
        )
    }
     
}