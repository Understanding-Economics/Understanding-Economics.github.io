import React from 'react'

export default class DataView extends React.Component {
    render() {
        if(!this.props.selectedQuestion) {
            return null;
        }
        return (
            <div id = {this.props.elementId}></div>
        )
    }

    componentDidUpdate() {
        let selectedGroup = this.props.selectedGroup;
        let selectedQuestion = this.props.selectedQuestion; 
        let data = this.props.data; 
        let renderFunction = this.props.renderFunction;
        if (selectedGroup && selectedQuestion && data) {
            renderFunction(this.props.elementId, selectedGroup, selectedQuestion, data);
        }
    }
}