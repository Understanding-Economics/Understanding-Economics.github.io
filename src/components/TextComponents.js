import React from 'react'

export class Section extends React.PureComponent {
    render() {
        return <h3>{this.props.children}</h3>
    }
}

export class Subsection extends React.PureComponent { 
    render() {
        return <h4>{this.props.children}</h4>
    }
}

