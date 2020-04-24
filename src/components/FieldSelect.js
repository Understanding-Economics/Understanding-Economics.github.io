import React from 'react'
import PropTypes from 'prop-types'
import '../css/FieldSelect.css'
import '../App.css'
import ScrollableDesc from './ScrollableDesc';

export default class FieldSelect extends React.Component { 
    constructor() { 
        super();
        this.slctDivRef = React.createRef();
        this.descDivRef = React.createRef();
        this.slctRef = React.createRef();
    }

    render() {
        if(!this.props.options) {
            return null;
        }
        let optionComponents = getValues(this.props.options).map((option) => {
            return <option value = {option.id}>{option.title}</option>
        });
        let selectedTitle = this.props.selected ? this.props.options[this.props.selected].title : "";
        let selectedDescription = this.props.selected ? this.props.options[this.props.selected].description : "";
        return (
            <div className = "FieldSelect">
                <div className = "row">
                    <h4>{this.props.title}</h4>
                </div>
                <div className = "row">
                    <span>{this.props.description}</span>
                </div>
                <div className = "row slctDiv" ref = {this.slctDivRef}>
                    <select className = "align-left" size = {7} ref = {this.slctRef} value = {this.props.selected} onChange={this.props.handleSelect}>
                        {optionComponents}
                    </select>
                </div>
                <ScrollableDesc 
                    title = {selectedTitle} 
                    content = {selectedDescription}
                    maxHeight = "110px"
                    minHeight = "75px"
                />
            </div>
        );
    }

    componentDidUpdate() {
        if(this.slctRef.current && !this.props.selected) { 
            this.slctRef.current.selectedIndex = "-1";
        }
    }
}

function getValues(dict) {
    return Object.keys(dict).map(key => dict[key])
}

FieldSelect.propTypes = { 
    title : PropTypes.string,

}