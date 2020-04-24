import React from 'react'
import StatBubble from './StatBubble'
import DataDisplay from './DataDisplay'

export default class UmbrellaDisplay extends React.Component {
    constructor(){
        super();
        this.state = {
            question : undefined
        }
    }
    render() {
        if(!this.props.group) {
            return null;
        }
        let subquestions = this.props.question.questions;
        let selectedQuestion = this.state.question || subquestions[0];
        if(subquestions == undefined) {
            throw new Error("No subquestions for Umbrella display")
        }
        let bubbles = subquestions.map(question => 
            <div className = "col-md-3" style={{marginBottom : "10px"}}>
                <StatBubble
                    title = { question.title }
                    active = { question == selectedQuestion }
                    handleClick = { (() => this.handleClick(question)).bind(this) }
                />
            </div>    
        )

        return (
            <div className = "UmbrellaDisplay">
                <div className = "row header">
                    <span>{ this.props.question.description }</span>
                </div>
                <div className = "row">
                    { bubbles }
                </div>
                <DataDisplay
                    data = { this.props.data }
                    selectedGroup = { this.props.group }
                    selectedQuestion = { selectedQuestion }
                />
            </div>
        )
    }

    handleClick(question) {
        this.setState({
            question : question
        });
    }
}