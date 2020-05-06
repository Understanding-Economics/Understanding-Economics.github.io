import React from 'react'
import { NavLink } from 'react-router-dom'

export default class HighlightBlock extends React.PureComponent {
    render() {
        return <div className = "col-3" style ={{marginRight: -10, minWidth: 100}}>
            <NavLink to = {this.props.url}>
                <div className = "text-center card h-100"
                    style = {{
                        padding : 10,
                        borderColor : this.props.color,
                        borderWidth: 10
                    }}
                >
                    <span style = {{marginTop: "auto", marginBottom: "auto"}}>
                            <strong style={{color: "dimgray"}}>
                                {this.props.text}
                            </strong>
                    </span>
                </div>
            </NavLink>
        </div>
    }
}