/* eslint no-undef: "off"*/
import React from 'react'
import DataView from './DataView'
import './../css/CrossTabView.css'
import Utils from '../Utils'

export default class CrossTabView extends React.Component {
    render() {
        return <DataView 
                    elementId = "crosstab" 
                    survey = { this.props.survey }
                    data = { this.props.data }
                    selectedGroup = { this.props.selectedGroup }
                    selectedQuestion = { this.props.selectedQuestion }
                    renderFunction = { this.renderCrossTabs }
                />
    }

    renderCrossTabs(elementId, selectedGroup, selectedQuestion, data) {
        let cleanData = data.map((x) => { return {group : x[selectedGroup.id] || " No Response", response : x[selectedQuestion.id] || " No Response"} });
        let groupSorter = Utils.getGroupSorter(selectedGroup);
        let responseSorter = Utils.getQuestionSorter(selectedQuestion)
        let sorters = {
            group : groupSorter,
            response : responseSorter,
        }
        $(`#${elementId}`).pivot(cleanData, 
            {
                rows : ["group"],
                cols: ["response"],
                aggregator: $.pivotUtilities.aggregators["Count"](),
                sorters : sorters
            });
    }
}