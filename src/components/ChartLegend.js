import React from 'react'
import Colors from '../Colors'
import Utils from '../Utils';

export default class ChartLegend extends React.PureComponent {
    render() { 
        if (!this.props.question || !this.props.data) {
            return null;
        }
        let colorPattern = Utils.getColorPattern(this.props.question); 
        let responses = Utils.getUniqueDictVals(this.props.data, this.props.question.id, 
                            Utils.getQuestionSorter(this.props.question));
        
        let legendItems = responses.map((val, i) => 
        <div className = "col-md text-center card unselectable"
        style = {{
            color : "black",
            backgroundColor: colorPattern[i],
            margin: "3px",
            fontSize : "13px",
            minHeight: "30px",
            maxWidth: "33%", 
            padding: "3px"
        }}>
            <strong>{val}</strong>
        </div>)
        return <div className = "row legend centered">
            {legendItems}
        </div>
    }
}