import React from 'react'
import ImageView from './ImageView'

export default class KeynessDisplay extends React.PureComponent { 
    render() { 
        return <div className = "KeynessDisplay">
            <div className = "row header ">
                <h5>{this.props.question.description}</h5>
            </div>

            <div className = "row">
                <ImageView 
                    question = {this.props.question}
                />
            </div>
            
        </div>
    }   
}