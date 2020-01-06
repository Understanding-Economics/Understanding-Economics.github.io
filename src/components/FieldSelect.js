import React from 'react'
import PropTypes from 'prop-types'
import '../css/FieldSelect.css'

export default class FieldSelect extends React.Component { 
    constructor() { 
        super();
        this.slctDivRef = React.createRef();
        this.descDivRef = React.createRef();
    }

    render() {
        if(!this.props.options) {
            return null;
        }
        let optionComponents = getValues(this.props.options).map((option) => {
            return <option value = {option.id}>{option.title}</option>
        });
        let selectedDescription = this.props.selected ? this.props.options[this.props.selected].description : "";
        return (
            <div>
                <div className = "row">
                    <h4>{this.props.title}</h4>
                </div>
                <div className = "row">
                    <span>{this.props.description}</span>
                </div>
                <div className = "row">
                    <div className = "col-md-6 slctDiv" ref = {this.slctDivRef}>
                        <select className = "align-left" size = {8} value = {this.props.selected} onChange={this.props.handleSelect}>
                            {optionComponents}
                        </select>
                    </div>
                    <div className = "col-md-6 scrolling" ref = {this.descDivRef}>
                        <span className = "align-top align-text-top" dangerouslySetInnerHTML={{__html : selectedDescription}}>
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.slctDivRef.current &&  this.descDivRef.current) {
            this.descDivRef.current.style.height = `${this.slctDivRef.current.offsetHeight}px`
        }
    }
}

function getValues(dict) {
    return Object.keys(dict).map(key => dict[key])
}

FieldSelect.propTypes = { 
    title : PropTypes.string,

}