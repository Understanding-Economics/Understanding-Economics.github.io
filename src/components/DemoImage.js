import React from 'react'
import "../css/DemoImage.css"

export default class DemoImage extends React.PureComponent {
    render() {
        return <img 
            src = {process.env.PUBLIC_URL + "/demo_images/" + this.props.src}
            className = "demoImage"
        />
    }
}