import React from 'react'

export default class CorrectDisplay extends React.PureComponent {
    render() {
        if (!this.props.question || !this.props.question.correct) {
            return null;
        }
        let formatter =  this.props.formatter || (x => x);
        let sourceText = null; 
        if(this.props.question.source) {
            if (this.props.question.source_url) {
                sourceText = <span>    (Source: <a href = {this.props.question.source_url} target = "_blank">{this.props.question.source}</a>)</span>
            }
            else{
                sourceText = <span>    (Source: {this.props.question.source})</span>
            }
        }
        return <div className = "header">
            <strong style={{color:"green", fontSize:"14pt"}}>Correct Answer: {formatter(this.props.question.correct)}</strong>
            <em style={{fontSize:"8pt", marginLeft: "5px", verticalAlign: "top"}}>
                {sourceText ? sourceText : null}
            </em>
        </div>
    }
}