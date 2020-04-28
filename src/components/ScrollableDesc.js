import React from 'react'

export default class ScrollableDesc extends React.PureComponent {
    render() {
        let textStyle = {
            minHeight : this.props.minHeight,
            maxHeight : this.props.maxHeight,
            height : this.props.height,
            paddingRight: "10px"
        }
        return (
            <div>
                <div className = "row">
                    <strong>{this.props.title}</strong>
                </div>
                <div className = "row">
                    <span className = "scrolling" dangerouslySetInnerHTML={{__html : this.props.content}} style = {textStyle} ref = {this.descDivRef}>
                    </span>
                </div>
            </div>
        )
    }
}