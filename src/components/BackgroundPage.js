import React from 'react'

import { Section, Subsection} from './TextComponents'

export default class HomePage extends React.Component {
    render() {
        document.title = "Background - Understanding Economics";
        return (
            <div className = "HomePage">
                <Section>Introduction of the paper</Section>
                
                <p>
                People hold starkly different views on many policies, but the reason for these differing views is not always apparent. Conflicts may be based on the perceived economic effects of these policies, as individuals may disagree on which policy will be most effective at achieving a given goal. Alternatively, it could be that people assess the benefits and costs to them and those they care about in contrasting ways. Yet another reason may be divergent views on what is "fair" or "just." 
                </p>

                <p>
                Take the example of income taxes. Different views about the "right" level of taxes could come from the perceived behavioral or efficiency effects of it ("Will people stop working if taxes are higher?"), from the perceived distributional impacts ("Who benefits if taxes are cut? What is the underlying income distribution?"), and from the fairness criteria people apply when weighting winners and losers ("How much more is a dollar of a transfer from a higher to a lower-income person worth?" or "How fair is it that children born in wealthy families inherit more?"). The assessment of most other policies also involves these three central factors: efficiency, distribution, and fairness. Variation in policy views could be traced to one or more of these primary considerations. The perception of and weight assigned to them may differ across groups of people, e.g., based on political affiliation, income, education, or gender. 
                </p>
                
                <p>
                In this paper, I explore what people know and, most importantly, how they reason about four major policies in the U.S.: income taxation, estate taxation, health insurance, and trade policy. What are the considerations people have in mind when thinking about a given policy? These may -- rightly or wrongly-- not be in line with the ones economists are thinking about. I examine the the mechanisms that people think each policy operates through and how they trade-off the different considerations. Do people focus more on policies' distributional implications or rather on their efficiency costs? What fairness criteria do they employ? How do the answers to these questions differ by the socio-economic and political characteristics of respondents? I also study whether people learn about the economic policies and change their views about them if one provides simple, but nuanced explanations of their distributional and efficiency consequences, perhaps the way one might do in an introductory economics class." 

                </p>

                <p>
                The full paper can be found here <bf>[link to paper]</bf>.
                </p>

                <Section>Additional resources</Section>

                <Subsection>Survey design</Subsection>

                The full survey questionnaire and the definition of variables can be found here <bf>[link]</bf> and here <bf>[link]</bf>.

                Sometimes, the answers were grouped to reduce the numbers of categories to be displayed. You can find how that was done here <bf>[link]</bf>. 

                Contrarily to the other topic categories, the "text analysis" section displays figures from the paper and are not plotted online in real-time. Data has been cleaned in order to be able to compare answers across respondents. The word clouds shows the words that are the most frequently used with a label size proportional to their frequency. The keywords show all groups of 2 words (separated with at most one word) that are significantly more used by one group compared to another group. More about the methodology used here <bf>[link to online appendix]</bf>.


                <Subsection>Videos</Subsection>

                The videos are made to assess whether explaining the stakes behind a policy can modifiy people's perceptions and supports. There are three versions of each video: an "efficiency" version, that focuses on comparing costs to benefits, a "distributional" version, that focuses on the effects on the distribution of outcomes across the whole population, and an "economist" version, that gathers both arguments in order to give a general view of what is at stake with the policy. People's answers are compared when shown different versions of the them.
                <ul>
                    <li>Income [Efficiency] [Distributional] [Economist]</li>
                    <li>Estate [Efficiency] [Distributional] [Economist]</li>
                    <li>Health [Efficiency] [Distributional] [Economist]</li>
                    <li>Trade [Efficiency] [Distributional] [Economist]</li>
                </ul>

                
            </div>
        )
    }
}