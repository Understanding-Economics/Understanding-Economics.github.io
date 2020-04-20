import React from 'react'
import StackedChartView from './StackedChartView'

export default class TreatmentChartView extends React.PureComponent {
    render() { 
        let c3Overrides = { 
            axis : {
                rotated : true, 
                x : {
                    show : false
                }, 
                y : {
                    show : false
                }
            },
            padding : {
                left: 0
            }
        }

        return <StackedChartView 
            survey = { this.props.survey } 
            data = { this.props.data }
            selectedGroup = { this.props.selectedGroup }
            selectedQuestion = { this.props.selectedQuestion }
            elementId = { this.props.elementId }
            c3Override = { c3Overrides }
            receiveChart = { this.props.receiveChart }
        />
    }
}