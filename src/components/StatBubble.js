import React from 'react'
import '../css/StatBubble.css'

export default class StatBubble extends React.PureComponent { 
    render() { 
        return (
            <a href="#" className = "StatBubble text-center card h-100" onClick = { (e) => {e.preventDefault(); this.props.handleClick()} }>
                <strong className = "BubbleTitle">{this.props.title}</strong>
                {this.props.stat.toFixed(2)}
            </a>
        )
    }
}