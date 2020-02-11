import React from 'react'
import Utils from '../Utils'

export default class DummyChartView extends React.Component {
    render() { 
        let c3Overrides = { 
            axis : {
                x : {
                    show : true
                }, 
                y : {
                    show : false
                }
            }, 
            color: { 
                pattern : ["#ffffff"]
            },
            tooltip : {
                show: false
            },
        }

        let sorter = null;
        if(this.props.selectedGroup.sorter) {
            sorter = $.pivotUtilities.sortAs(this.props.selectedGroup.sorter);
        }
        else {
            sorter = (a, b) => a.localeCompare(b);
        }

        let displayElts = ["All", ...Utils.getUniqueDictVals(this.props.data, this.props.selectedGroup.id, sorter)]
                            .map(x => <tr style={{overflow: "hidden"}}><td><strong>{x}</strong></td></tr>);

        return <table id = "ChartLabel" style={{marginTop: "2%"}}>
            <tbody style={{fontSize : "12px"}}>
                {displayElts}
            </tbody>
        </table>

        /* return <ChartView 
            survey = { this.props.survey } 
            data = { this.props.data }
            selectedGroup = { this.props.selectedGroup }
            selectedQuestion = { this.props.selectedQuestion }
            elementId = { this.props.elementId }
            c3Override = { c3Overrides }
        />*/ 
    }
    
    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        /* let chartElement = document.getElementById(this.props.elementId);
        let legendItems = chartElement.getElementsByClassName("c3-legend-item");
        for(let item of legendItems) {
            item.style.display = "none";
        }

        chartElement.getElementsByClassName("c3-chart")[0].style.display = "none";
        chartElement.getElementsByClassName("domain")[0].style.display = "none";
        let lines = chartElement.getElementsByTagName("line");
        for(let line of lines) {
            line.style.display = "none";
        }
        
        chartElement.getElementsByClassName("c3-axis-x-label")[0].style.display = "none";

        chartElement.getElementsByClassName("c3-axis-x")[0].setAttribute("style", "font-weight: bold"); */
    }
}