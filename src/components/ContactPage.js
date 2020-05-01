import React from 'react';
import { Section, Subsection } from './TextComponents'

export default class ContactPage extends React.PureComponent {
    render() {
        return(<div className = "ContactPage" style = {{marginBottom: 20}}>
            <Section>Contact us</Section>
            <Subsection>Feedback</Subsection>
            General feedback should be sent to: <a href = "mailto:contact@socialeconomicslab.org">contact@socialeconomicslab.org</a>. <br/><br/>

            Any technical issues can be reported to: <a href = "mailto:kevinbi@college.harvard.edu">kevinbi@college.harvard.edu</a>. <br/><br/>

            You can also reach Stefanie Stantcheva via email at <a href = "mailto:sstantcheva@fas.harvard.edu">sstantcheva@fas.harvard.edu</a>
            <Subsection>Other research</Subsection>
            If you are interested in seeing other research projects from Stefanie Stantcheva's Social Economics Lab, you can visit the <a href = "http://socialeconomicslab.org/">Social Economics Lab Website</a>!
        </div>)
    }
}