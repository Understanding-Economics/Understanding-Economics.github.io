import React from 'react'
import { NavLink } from 'react-router-dom'

export default class HighlightBlock extends React.PureComponent {
    render() {
        return <div className = "col-md-3">
            <div className = "text-center card h-100"
                style = {{
                    padding : 10,
                    borderColor : this.props.color,
                    borderWidth: 10
                }}
            >
                <NavLink to = {this.props.url}><strong style={{color: "dimgray"}}>
                    {this.props.text}
                </strong></NavLink>
            </div>
        </div>
    }
}