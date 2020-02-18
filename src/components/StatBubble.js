import React from 'react'
import '../css/StatBubble.css'

export default class StatBubble extends React.PureComponent { 
    render() { 
    let classNames = "StatBubble text-center card h-100 " + (this.props.active ? "active" : "");
        return (
            <a href="#" className = {classNames} onClick = { (e) => {e.preventDefault(); this.props.handleClick()} }>
                <strong className = "BubbleTitle">{this.props.title}</strong>
                {this.props.formatter ? this.props.formatter(this.props.stat.toFixed(2)) : this.props.stat.toFixed(2)}
            </a>
        )
    }
}