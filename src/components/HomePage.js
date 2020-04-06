import React from 'react'
import { Section } from './TextComponents'
import { NavLink } from 'react-router-dom';

export default class HomePage extends React.Component {
    // NOTE: 
    // Make a tab "About" with [link to SS website].
    render() {
        document.title = "Understanding Economics";
        return (
            <div className = "HomePage">
                <h2>Welcome to the "Understanding Economics" website!</h2>

                <Section>Project</Section>

                <p>
                The goal of this project is to understand better what people know and learn about economic policies, how they reason about them, and how their support for different policies is determined. 
                </p>

                <p>
                This website makes the full survey data from this project easy to access and analyze. 
                </p>

                <p>
                You can explore four big policy issues: Income Tax, Estate Tax, Health Insurance, and Trade Policy. Click on the tab you are interested in to explore the data. 
                </p>

                <Section>How does this website work?</Section>

                <p>
                This website was designed to enable you to explore and display how the answers to all survey questions are distributed for different categories of population (e.g.: by groups of income, by states in the U.S., by age groups, etc)
                </p>

                <p>
                First choose a big issue policy from the tabs. Then, choose a topic, a specific question for that topic, and a group for which you'd like to see the answers displayed. You can explore as many topics, questions, and groups as you'd like.
                </p>

                <p>
                Some questions have several formulations (Generic, You, and Gender), which were randomized across respondents in order to compare how people's responses are changed when we change the way we ask the question. 
                </p>

                <p>
                More information about the project and the surveys can be found <NavLink exact to = "/background">here</NavLink>.
                </p>
            </div>
        )
    }
}