import React from 'react'
import StatBubble from './StatBubble'
import '../css/NumericDisplay.css'
import HistogramView from './HistogramView'
import NumberFormats from '../NumberFormats'
import Utils from '../Utils'

export default class NumericDisplay extends React.Component {
    constructor() { 
        super();
        this.state = {
            selectedGroupVal : "All"
        };
    }
    render() { 
        let data = this.cleanData(this.props.data);
        let averages = this.calcAverages(data).sort((a, b) => Utils.getGroupSorter(this.props.group)(a.groupVal, b.groupVal));
        let formatter = NumberFormats[this.props.question.format] || (x => x);
        let statBubbles = averages.map(x => 
            <div className = "col-md-3" style={{marginBottom : "10px"}}>
                <StatBubble 
                    title = { x.groupVal }
                    stat = { x.average }
                    active = { x.groupVal == this.state.selectedGroupVal }
                    handleClick = { this.createClickHandler(x.groupVal) }
                    formatter = { formatter }
                />
            </div>
        );
        let correctDiv = null;
        if(this.props.question.correct != undefined) {
            correctDiv = <div className = "row header" style={{color:"green", fontSize:"14pt"}}>
                <strong>Correct Answer: {formatter(this.props.question.correct)}</strong>
            </div>
        }
        return (
            <div className = "NumericDisplay">
                <div className = "row header">
                    <h5>Average response to "<strong>{this.props.question.description}</strong>" by <strong>{this.props.group.title.toLowerCase()}</strong> of the respondent</h5>
                </div>
                {correctDiv}
                <div className = "row">
                    { statBubbles }
                </div>
                <div className = "row">
                    <HistogramView
                        survey = { this.props.survey } 
                        data = { this.cleanData(this.props.data) }
                        selectedGroup = { this.props.group }
                        selectedQuestion = { this.props.question }
                        groupVal = { this.state.selectedGroupVal }
                        formatter = {formatter}
                    />
                </div>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedGroupVal : "All"
        })
    }

    cleanData(data) {
        let filteredData = data.filter(x => x[this.props.group.id] && x[this.props.question.id]);
        let sortedData = filteredData.sort((a, b) => a[this.props.question.id] - b[this.props.question.id]);
        return filteredData.filter(x => sortedData.indexOf(x) <= 0.95 * sortedData.length);
    }
    
    createClickHandler(groupVal) {
        return function() {
            this.setState({
                selectedGroupVal : groupVal
            });
        }.bind(this);
    }
    
    calcAverages(data) {
        let acc = {
            All : {
                sum : 0,
                count : 0
            }
        }
        let groupId = this.props.group.id;
        let questionId = this.props.question.id;
        for(let row of data) {
            let groupVal = row[groupId];
            if(!(groupVal in acc)) {
                acc[groupVal] = {sum : 0, count : 0}
            }
            acc.All.sum += Number(row[questionId]);
            acc.All.count++;
            acc[groupVal].sum += Number(row[questionId]);
            acc[groupVal].count++; 
        }
        
        return Object.keys(acc).map(k => { 
            return {groupVal : k, average : acc[k].count > 0 ? acc[k].sum / acc[k].count : 0}
        })
    }
}