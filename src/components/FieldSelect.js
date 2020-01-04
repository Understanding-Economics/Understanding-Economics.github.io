import React from 'react'
import PropTypes from 'prop-types'
import '../css/FieldSelect.css'

export default class FieldSelect extends React.Component { 
    render() {
        if(!this.props.options) {
            return null;
        }
        let optionComponents = this.props.options.map((option) => {
            return <option value = {option.id}>option.title</option>
        });
        let selectedDescription = this.props.selected ? this.props.options[this.props.selected].description : "";
        return (
            <div className = "row">
                <h3>{this.props.title}</h3>
                <span>{this.props.description}</span>
                <div className = "col-md">
                    <select size = {8} value = {this.props.selected} onChange={this.props.handleSelect}>
                        {optionComponents}
                    </select>
                </div>
                <div className = "col-md">
                    <span className = "align-top align-text-top">
                        {selectedDescription}
                    </span>
                </div>
            </div>
        );
    }
}

FieldSelect.propTypes = { 
    title : PropTypes.string,

}