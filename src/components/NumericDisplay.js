import React from 'react'
import StatBubble from './StatBubble'

export default class NumericDisplay extends React.Component {
    render() { 
        let data = cleanData(this.props.data);
        let averages = this.calcAverages(data).sort(a, b => {
            if(this.group.sorter) {
                return this.group.sorter.indexOf(a.groupVal) - this.group.sorter.indexOf(b.groupVal);
            }
            else {
                return a.groupVal.localeCompare(b.groupVal);
            }
        });
        let statBubbles = averages.map(x => 
            <StatBubble 
                title = { x.groupVal }
                stat = { x.average }
                handleClick = { this.createClickHandler(x.groupVal) }
            />);
        return null;
    }

    cleanData(data) {
        return data.filter(x => x[this.props.group.id] && x[this.props.question.id]);
    }
    
    createClickHandler(groupVal) {
        return function() {
            this.setState({
                selectedGroupVal : groupVal
            });
        }.bind(this);
    }

    calcAverages(data) {
        let acc = {}
        let groupId = this.props.group.id;
        let questionId = this.props.question.id;
        for(let row of data) {
            let groupVal = row[groupId];
            if(!(groupVal in acc)) {
                acc[groupVal] = {sum : 0, count : 0}
            }
            acc[groupVal].sum += row[questionId];
            acc[groupVal].count++; 
        }
        
        return Object.keys(acc).map(k => { 
            return {groupVal : k, average : acc[k].sum / acc[k].count}
        })
    }
}