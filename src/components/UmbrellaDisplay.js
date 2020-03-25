import React from 'react'

export default class UmbrellaDisplay extends React.Component {
    constructor(){
        super();
        this.state = {
            question : undefined
        }
    }
    render() {
        let subquestions = this.props.question.questions;
        if(subquestions == undefined) {
            throw new Error("No subquestions for Umbrella display")
        }
        let bubbles = subquestions.map(question => 
            <div className = "col-md-3" style={{marginBottom : "10px"}}>
                <StatBubble
                    title = { question.title }
                    active = { question == this.state.question }
                    handleClick = { (() => this.handleClick(question)).bind(this) }
                />
            </div>    
        )

        return (
            <div className = "UmbrellaDisplay">
                <div className = "row">
                    { bubbles }
                </div>
                <DataDisplay
                    data = { this.props.data }
                    selectedGroup = { this.props.group }
                    selectedQuestion = { this.state.question }
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