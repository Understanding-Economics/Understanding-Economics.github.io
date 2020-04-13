import React from 'react'

export default class CorrectDisplay extends React.PureComponent {
    render() {
        if (!this.props.question || !this.props.question.correct) {
            return null;
        }
        let formatter =  this.props.formatter || (x => x);
        return <div className = "header">
            <strong style={{color:"green", fontSize:"14pt"}}>Correct Answer: {formatter(this.props.question.correct)}</strong>
            <em style={{fontSize:"8pt", marginLeft: "5px", verticalAlign: "top"}}>{this.props.question.source ? `  (Source: ${this.props.question.source})` : null}</em>
        </div>
    }
}