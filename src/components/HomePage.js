import React from 'react'
import DemoImage from './DemoImage'
import { Section } from './TextComponents'
import Utils from '../Utils'
import HighlightBar from './HighlightBar'

export default class HomePage extends React.Component {
    // NOTE: 
    // Make a tab "About" with [link to SS website].
    render() {
        document.title = "Understanding Economics";
        let trackingUrl = "/";
        Utils.logPageview(trackingUrl);
        return (
            <div className = "HomePage">
                <h2 style = {{marginBottom : "20px"}}>Welcome to the Understanding Economics Project!</h2>
                <img src = {`${process.env.PUBLIC_URL}/home_images/cargo.jpeg`} style={{height: "250px", marginBottom: "20px"}}/>

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

                <HighlightBar />
                <Section>How does this website work?</Section>

                <p>
                This website was designed to enable you to explore and display how the answers to all survey questions are distributed for different categories of population (e.g.: by groups of income, by states in the U.S., by age groups, etc)
                </p>

                <p>
                First choose a big issue policy from the tabs above:
                </p>

                <DemoImage src = "tabs.png"/>
                
                <p> Then, choose a topic area that you are interested in exploring:</p>
                
                <DemoImage src = "topic.png" />
                
                <p>Choose a specific question within that topic for which you would like to see responses: </p> 

                <DemoImage src = "question.png"/>
                
                <p>Finally, choose a demographic group by which you'd like to see answers to the question organized</p>

                <DemoImage src ="groupby.png"/>

                <p>You can explore as many topics, questions, and groups as you'd like. </p>

                <p>
                Some questions have several formulations (Generic, You, and Gender), which were randomized across respondents in order to compare how people's responses are changed when we change the way we ask the question. 
                </p>

                <p>
                More information about the project and the surveys can be found <a href = "https://stefanie-stantcheva.onrender.com" target = "_blank">here</a>.
                </p>
            </div>
        )
    }
}