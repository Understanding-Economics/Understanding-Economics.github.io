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
                fontSize : "10pt",
                minHeight: "30px",
                maxWidth: responses.length > 6 ? "15%" : `${(100 / responses.length) - 2}%`,
                minWidth: responses.length < 6 ? "18%" : "15%",
                padding: "3px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginLeft: i % 6 == 0 ? "auto" : "3px", 
                marginRight: (i + 1) % 6 == 0 || i == responses.length - 1 ? "auto" : "3px",
                marginTop: "10px",
                marginBottom: "20px",
                opacity : val.trim() == this.props.question.correct ? 1.0 : 0.8,
                fontWeight : val.trim() == this.props.question.correct ? 900 : undefined,
                textDecoration : val.trim() == this.props.question.correct ? "underline" : undefined
        }}>
            <strong>{val}</strong>
        </div>)
        return <div className = "row legend" style={{marginLeft: "auto", marginRight: "auto", width:"100%"}}>
            {legendItems}
        </div>
    }
}