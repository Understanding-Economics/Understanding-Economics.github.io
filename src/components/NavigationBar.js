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
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                    <li className = "nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to="/">
                            Home
                        </NavLink> 
                    </li>
                    <li className = "nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to="/about">
                            About
                        </NavLink> 
                    </li>
                    {surveyLinks}
                    <li>
                        <NavLink exact className="nav-link" activeClassName="active" to="/contact">
                            Contact Us
                        </NavLink>
                    </li>
                    </ul>
                </div>
            </nav>
        )
    }
    componentDidMount() {

    }
}