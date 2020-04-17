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
            onMouseOver={() => {
                if(this.props.charts){
                    for(let chart of this.props.charts) {
                        chart.focus(val);
                    }
                }
            }}
            onMouseLeave={() => {
                if(this.props.charts){
                    for(let chart of this.props.charts) {
                        chart.revert();
                    }
                }
            }}
            style = {{
                color : "black",
                backgroundColor: colorPattern[i % colorPattern.length],
                margin: "3px",
                fontSize : "13px",
                minHeight: "30px",
                maxWidth: "33%", 
                padding: "3px",
                marginLeft: i == 0 ? "auto" : "3px", 
                marginRight: i == responses.length - 1 ? "auto" : "3px",
                opacity : val == this.props.question.correct ? 1.0 : 0.8
        }}>
            <strong>{val}</strong>
        </div>)
        return <div className = "row legend" style={{marginLeft: "auto", marginRight: "auto", width:"100%"}}>
            {legendItems}
        </div>
    }
}