import React from 'react'
import '../css/DataDisplay.css'
import DataType from '../DataType'
import CategoricalDisplay from './CategoricalDisplay'
import NumericDisplay from './NumericDisplay'
import TreatmentDisplay from './TreatmentDisplay'
import WordcloudDisplay from './WordcloudDisplay'
import UmbrellaDisplay from './UmbrellaDisplay'
import FrequencyDisplay from './FrequencyDisplay'

export default class DataDisplay extends React.Component {
    render() {
        let question = this.props.selectedQuestion;
        let data = this.props.data; 
        if (question && question.omit_surveys) {
            data = data.filter(x => question.omit_surveys.indexOf(x.survey) < 0)
        }
        let specificDisplay = null;
        if(!question) {
            return null;
        }
        switch(question.type) {
            case DataType.CATEGORICAL:
                specificDisplay = <CategoricalDisplay 
                    data = { data }
                    group = { this.props.selectedGroup }
                    question = { this.props.selectedQuestion }
                />
                break;
            case DataType.NUMERIC:
                specificDisplay = <NumericDisplay
                    data = { data }
                    group = { this.props.selectedGroup }
                    question = { this.props.selectedQuestion }
                />
                break;
            case DataType.FREQUENCY:
                specificDisplay = <FrequencyDisplay 
                    data = { data }
                    question = { this.props.selectedQuestion }
                />
                break;
            case DataType.TREATMENT:
                specificDisplay =  <TreatmentDisplay
                    data = { data }
                    group = { this.props.selectedGroup }
                    question = { this.props.selectedQuestion }
                />
                break;
            case DataType.WORDCLOUD:
                specificDisplay = <WordcloudDisplay
                    question = { this.props.selectedQuestion }
                />
                break;
            case DataType.UMBRELLA:
                specificDisplay = <UmbrellaDisplay 
                    data = { data }
                    group = { this.props.selectedGroup }
                    question = { this.props.selectedQuestion }
                />
                break;
            default: 
                throw new Error(`Invalid data type for ${ this.props.selectedQuestion.id}`)

        }
        return (
            <div className = "DataDisplay">
                { specificDisplay }
                <div style = {{height: 100}}></div>
            </div>
        )
    }
     
}