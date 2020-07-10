import React from 'react'
import { NavLink } from 'react-router-dom'

export default class ResetLink extends React.PureComponent {
    render() {
        return <NavLink to = {this.props.to} onClick = {() => window.scrollTo(0, 0)}>
            {this.props.children}
        </NavLink>
    }
}