import React from 'react'

export default class CorrectDisplay extends React.PureComponent {
    render() {
        if (!this.props.question || (!this.props.question.correct && !this.props.question.correct_text)) {
            return null;
        }
        let formatter =  this.props.formatter || (x => x);
        let sourceText = null; 
        if(this.props.question.source) {
            if(Array.isArray(this.props.question.source)){
                if(this.props.question.source_url && (!Array.isArray(this.props.question.source_url) || this.props.question.source_url.length != this.props.question.source.length)) {
                    throw new Error("Both source and source_url must be arrays of same length")
                }
                let sources = this.props.question.source.map((src, i) => {
                    if (this.props.question.source_url[i]){
                        return <a href = {this.props.question.source_url[i]} target = "_blank">{src}</a>;
                    }
                    else {
                        return src;
                    }
                }).reduce((acc, cur) => [acc, ", ", cur]);
                sourceText = <span>Source: {sources}</span>
            }
            else {
                if (this.props.question.source_url) {
                    sourceText = <span>Source: <a href = {this.props.question.source_url} target = "_blank">{this.props.question.source}</a></span>
                }
                else{
                    sourceText = <span>Source: {this.props.question.source}</span>
                }
            }
            }
        let correctText = this.props.question.correct_text || formatter(this.props.question.correct);
        return <div className = "header">
            <span>
                <strong style={{color:"green", fontSize:"14pt"}}>Correct Answer: {correctText}</strong><br/>
                <em style={{fontSize:"9pt", verticalAlign: "top"}}>
                    {sourceText ? sourceText : null}
                </em>
            </span>
        </div>
    }
}