import React from 'react'
import '../css/NavigationBar.css'
import { NavLink } from 'react-router-dom'
import { surveys } from '../config/fields.json'

export default class NavigationBar extends React.Component { 
    constructor() {
        super();
    }
    render() {
        let surveyLinks = Object.keys(surveys).map(surveyId => {
            let survey = surveys[surveyId]
            return (
                <li className = "nav-item">
                    <NavLink className="nav-link" activeClassName="active" to={`/survey/${surveyId}`}>
                        {survey.title}
                    </NavLink>
                </li>
            )
        })
        return (
            <ul className = "nav nav-tabs">
                <li className = "nav-item">
                    <NavLink exact className="nav-link" activeClassName="active" to="/">
                        Home
                    </NavLink> 
                </li>
                <li className = "nav-item">
                    <NavLink exact className="nav-link" activeClassName="active" to="/background">
                        Background
                    </NavLink> 
                </li>
                {surveyLinks}
            </ul>
        )
    }
    componentDidMount() {

    }
}