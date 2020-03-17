import React from 'react'
import ImageView from './ImageView'

export default class WordcloudDisplay extends React.Component { 
    render() { 
        return (
        <div className = "Wordcloud Display">
            <div className = "row header ">
                <h5>{this.props.question.description}</h5>
            </div>

            <div className = "row">
                <ImageView 
                    question = {this.props.question}
                />
            </div>
        </div>
        )
    }
}