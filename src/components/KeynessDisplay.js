import React from 'react'
import ImageView from './ImageView'

export default class KeynessDisplay extends React.PureComponent { 
    render() { 
        return <div className = "KeynessDisplay">
            <h3>{this.props.question.description}</h3>
            
        </div>
    }   
}