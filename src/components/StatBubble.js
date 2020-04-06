import React from 'react'
import '../css/StatBubble.css'

export default class StatBubble extends React.PureComponent { 
    render() { 
    let style = this.props.title == "All" ? { textDecoration : "underline" } : {};
    let classNames = "StatBubble text-center card h-100 " + (this.props.active ? "active" : "");
        return (
            <a href="#" className = {classNames} onClick = { (e) => {e.preventDefault(); this.props.handleClick()}}>
                <strong className = "BubbleTitle" style = {style}>{this.props.title == "All" ? this.props.title.toUpperCase() : this.props.title}</strong>
                {
                    this.props.stat ? 
                    (this.props.formatter ? this.props.formatter(this.props.stat.toFixed(0)) : this.props.stat.toFixed(0)) :
                    null
                }
            </a>
        )
    }
}