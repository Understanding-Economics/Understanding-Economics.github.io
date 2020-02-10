import React from 'react'
import ChartView from './ChartView'

export default class TreatmentChartView extends React.Component {
    render() { 
        let c3Overrides = { 
            axis : {
                x : {
                    show : false
                }, 
                y : {
                    show : false
                }
            }
        }

        return <ChartView 
            survey = { this.props.survey } 
            data = { this.props.data }
            selectedGroup = { this.props.selectedGroup }
            selectedQuestion = { this.props.selectedQuestion }
            elementId = { this.props.elementId }
            c3Override = { c3Overrides }
        />
    }
}