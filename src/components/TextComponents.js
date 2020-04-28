import React from 'react'

export class Section extends React.PureComponent {
    render() {
        return <h3 style ={{marginBottom: "10px"}}>{this.props.children}</h3>
    }
}

export class Subsection extends React.PureComponent { 
    render() {
        return <h4 style = {{marginBottom: 10, marginTop: 20}}>{this.props.children}</h4>
    }
}

