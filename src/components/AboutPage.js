import React from 'react'

import { Section, Subsection} from './TextComponents'
import { NavLink } from 'react-router-dom';

export default class AboutPage extends React.Component {
    render() {
        document.title = "About - Understanding Economics";
        return (
            <div className = "AboutPage">
                <Section>Paper</Section>

                <p>
                The full paper can be found <a href = "https://www.dropbox.com/s/zlvzvj8pnqvb1iy/Stantcheva_Understanding_Economics.pdf?dl=0" target = "_blank">here</a>.
                </p>

                <Section>Additional resources</Section>

                <Subsection>Survey design</Subsection>

                <p>The full survey questionnaire can be found <a href = "https://www.dropbox.com/s/2evbqrrnodbkzet/Survey_Questionnaires.pdf?dl=0" target = "_blank">here</a>.</p>

                <p>Sometimes, the answers were grouped to reduce the numbers of categories to be displayed. The distribution of respondents’ characteristics between these categories can be found <NavLink exact to = "/survey/pooled">here</NavLink>. </p>

                <p>Unlike the other topic categories, the "text analysis" section displays figures from the paper and are not plotted online in real-time. Data has been cleaned in order to be able to compare answers across respondents. The word clouds shows the words that are the most frequently used with a label size proportional to their frequency. The keywords show all groups of 2 words (separated with at most one word) that are significantly more used by one group compared to another group. More about the methodology used <a href = "https://www.dropbox.com/s/wmr1rk6f59xb35o/Understanding_Economics_Online_Appendix.pdf?dl=0" target = "_blank">here</a>.</p>

                <Subsection>Randomization</Subsection>
                <p>
                A randomization consists in creating two groups whose characteristics are comparable in average: approximately same percentage of females, approximately same percentage of unemployed people, and so on and so forth. A group is shown a reference version of the survey while the other is shown a slightly modified one. Here, the modifications can be the formulation of the questions or the fact that some respondents are shown small videos about the policy. Then we compare respondents’ answers and see if there is a change or not, i.e. if the modifications have an impact on how people respond
                </p>

                <Subsection>Formulation</Subsection>
                <p>
                In each survey, the formulation of many of the questions was randomized. The same root question is asked in three different ways: generic and impersonal (e.g.: "If the federal personal income tax rate were to increase for the middle class, to what extent would it encourage them to work less?"). The second formulation is focused directly on the respondent themselves ("If your federal personal income tax rate were to increase for the middle class, to what extent would it encourage you to work less?"). The third is specifically about women ("If the federal personal income tax rate were to increase for women in the middle class, to what extent would it encourage them to work less?"). The goal is to elicit whether respondents think differently about a generic person, women, or themselves, but without asking the same person different versions of the same question.
                </p>

                <Subsection>Videos</Subsection>

                <p>
                The videos are made to assess whether explaining the stakes behind a policy can modify people's perceptions and supports. There are three versions of each video: an "efficiency" version, that focuses on comparing costs to benefits, a "distributional" version, that focuses on the effects on the distribution of outcomes across the whole population, and an "economist" version, that gathers both arguments in order to give a general view of what is at stake with the policy. 
                </p>
                <ul>
                    <li>Income: <a href = "https://youtu.be/9xd-RHMiIcE" target = "_blank">Efficiency</a> <a href ="https://youtu.be/_vq7ZTjBN3Y" target = "_blank">Distributional</a> <a href = "https://youtu.be/e3NBmrzEmUQ" target = "_blank">Economist</a></li>
                    <li>Estate: <a href = "https://www.youtube.com/watch?v=pZ47JuiqoOU" target = "_blank">Efficiency</a> <a href = "https://www.youtube.com/watch?v=Wz5Xr723tJk" target = "_blank">Distributional</a> <a href = "https://www.youtube.com/watch?v=qnT07wO8nVA" target = "_blank">Economist</a></li>
                    <li>Health: <a href = "https://www.youtube.com/watch?v=Nai0nXX6VeQ" target = "_blank">Efficiency</a> <a href = "https://www.youtube.com/watch?v=Agexfb6apgY" target = "_blank">Distributional</a> <a href = "https://www.youtube.com/watch?time_continue=5&v=Se3SS4w5kNU" target = "_blank">Economist</a></li>
                    <li>Trade: <a href = "https://www.youtube.com/watch?v=3GvqLq16e6s" target = "_blank">Efficiency</a> <a href = "https://www.youtube.com/watch?v=rgvI1g0ldh8" target = "_blank">Distributional</a> <a href = "https://www.youtube.com/watch?v=5LrbF7TrGq0" target = "_blank">Economist</a></li>
                </ul>

                
            </div>
        )
    }
}