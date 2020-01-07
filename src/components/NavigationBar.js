import React from 'react'
import '../css/NavigationBar.css'
import { NavLink } from 'react-router-dom'

export default class NavigationBar extends React.Component { 
    constructor() {
        super();
    }
    render() {
        return (
            <ul className = "nav nav-tabs">
                <li className = "nav-item">
                    <NavLink exact className="nav-link" activeClassName="active" to="/">
                        Home
                    </NavLink> 
                </li>
                <li className = "nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/survey/income_survey">
                        Income Survey
                    </NavLink>
                </li>
            </ul>
        )
    }
    componentDidMount() {

    }
}