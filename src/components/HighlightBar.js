import React from 'react'
import HighlightBlock from './HighlightBlock' 
import Colors from '../Colors'
import highlights from '../config/highlights.json'


export default class HighlightBar extends React.PureComponent{
    render() {
        let highlightBlocks = highlights.map((highlight, i) => 
            <HighlightBlock 
                url = {highlight.url}
                text = {highlight.text}
                color = {Colors.Gradient5[i % 5]}
            />);
        return <div class="container-fluid">
            <div className = "row flex-row flex-nowrap" style = {{
                marginTop: 10,
                marginBottom: 10,
                paddingTop: 10,
                paddingBottom: 10,
                overflowX: "scroll"}}>
                {highlightBlocks}
            </div> 
        </div>
    }
}