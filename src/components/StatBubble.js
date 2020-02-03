import React from 'react'

export default class StatBubble extends React.PureComponent { 
    render() { 
        return (
            <div className = "NumberBubble card" onClick = { this.props.handleClick }>
                <div className = "row">
                    <strong>{this.props.title}</strong>
                </div>
                <div className = "row statistic">
                    {this.props.stat}
                </div>
            </div>
        )
    }
}