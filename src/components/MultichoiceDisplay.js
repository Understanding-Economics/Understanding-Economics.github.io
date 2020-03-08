import React from 'react'
import Utils from '../Utils'

export default class MultichoiceDisplay extends React.Component {
    render() { 
        let groupVals = Utils.getUniqueDictVals(this.props.data, this.props.group.id, Utils.getGroupSorter(this.props.group))
    }
}