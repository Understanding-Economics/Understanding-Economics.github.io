import React from 'react'

export default class ImageView extends React.PureComponent {
    render() {
        return <div className = "ImageView text-center">
            <img src={`${process.env.PUBLIC_URL}/images/${this.props.question.img_url}`}
                style = {{
                    maxWidth: "75%",
                    height: "auto"
                }}
            />
        </div>
    }
}