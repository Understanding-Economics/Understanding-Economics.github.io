import React from 'react'
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
        <div className = "text-center card unselectable"
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
                fontSize : "10pt",
                minHeight: "30px",
                maxWidth: responses.length > 5 ? "18%" : `${(100 / responses.length) - 2}%`,
                minWidth: "18%", 
                padding: "3px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginLeft: i % 5 == 0 ? "auto" : "3px", 
                marginRight: (i + 1) % 5 == 0 || i == responses.length - 1 ? "auto" : "3px",
                marginTop: "10px",
                opacity : val == this.props.question.correct ? 1.0 : 0.8
        }}>
            <strong>{val}</strong>
        </div>)
        return <div className = "row legend" style={{marginLeft: "auto", marginRight: "auto", width:"100%"}}>
            {legendItems}
        </div>
    }
}