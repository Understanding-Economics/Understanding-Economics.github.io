import React from 'react'
import '../css/DataDisplay.css'
import DataType from '../DataType'
import CategoricalDisplay from './CategoricalDisplay'
import NumericDisplay from './NumericDisplay'
import TreatmentDisplay from './TreatmentDisplay'
import KeynessDisplay from './KeynessDisplay'
import WordcloudDisplay from './WordcloudDisplay'
import UmbrellaDisplay from './UmbrellaDisplay'
import FrequencyDisplay from './FrequencyDisplay'

export default class DataDisplay extends React.Component {
    render() {
        let question = this.props.selectedQuestion;
        let specificDisplay = null;
        if(!question /* || !this.props.selectedGroup*/) {
            return null;
        }
        switch(question.type) {
            case DataType.CATEGORICAL:
                specificDisplay = <CategoricalDisplay 
                    data = { this.props.data }
                    group = { this.props.selectedGroup }
                    question = { this.props.selectedQuestion }
                />
                break;
            case DataType.NUMERIC:
                specificDisplay = <NumericDisplay
                    data = { this.props.data }
                    group = { this.props.selectedGroup }
                    question = { this.props.selectedQuestion }
                />
                break;
            case DataType.FREQUENCY:
                specificDisplay = <FrequencyDisplay 
                    data = { this.props.data }
                    question = { this.props.selectedQuestion }
                />
                break;
            case DataType.TREATMENT:
                specificDisplay =  <TreatmentDisplay
                    data = { this.props.data }
                    group = { this.props.selectedGroup }
                    question = { this.props.selectedQuestion }
                />
                break;
            case DataType.KEYNESS: 
                specificDisplay = <KeynessDisplay 
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
                    data = { this.props.data }
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
            </div>
        )
    }
     
}