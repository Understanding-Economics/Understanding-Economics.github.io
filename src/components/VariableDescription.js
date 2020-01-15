import React from 'react'
import '../App.css'

export default class VariableDescription extends React.Component { 
    render() {
        if (!this.props.selectedQuestion || !this.props.selectedQuestion.variables) { 
            return null;
        }
        
        return (
            <div>
                <div className = "row">
                    <h4>Variables</h4>
                </div>
                <div className = "row">
                    <span>Definitions of the variables in the question</span>
                </div>
                <div className = "row scrolling">
                    <ul>
                    { this.props.selectedQuestion.variables ?
                            this.props.selectedQuestion.variables.map(variable => (
                                <li>
                                    <strong>{variable.name}</strong>: {variable.description}
                                </li>
                            )) : null
                    }               
                    </ul>
                </div>
            </div>
        )
    }
}