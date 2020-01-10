import React from 'react'
import PropTypes from 'prop-types'
import QuestionSelector from './QuestionSelector'
import { surveys, groups } from '../config/fields.json'
import NotFound from './NotFound'
import DataDisplay from './DataDisplay'

// This is to cache the CSV data so that we are not consistently pinging the server for it.
var dataCache = {};
export default class DataPage extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedGroup : undefined,
            selectedContent : undefined
        }
        this.handleGroupSelect = this.handleGroupSelect.bind(this);
        this.handleContentSelect = this.handleContentSelect.bind(this);
    }
    componentWillMount() {
        this.surveyId = this.props.surveyId;
        if (this.surveyId && this.surveyId in surveys) {
            this.survey = surveys[this.surveyId];
        };
        this.groups = {...groups, ... (this.survey.additionalGroups || {})};
        this.topics = {...this.survey.topics, "Demographics" : {
            id : "Demographics",
            title : "Demographics",
            description : "Questions about the demographics of the respondent",
            questions : this.groups
        }};
    }

    render() {
        if(!this.survey) {
            return <NotFound />
        }
        return (
            <div className = "container-fluid">
                <div className = "row">
                    <QuestionSelector 
                        topics = {this.topics}
                        receiveSelection= {this.handleGroupSelect}
                    />

                    <QuestionSelector 
                        topics = {this.topics}
                        receiveSelection = {this.handleContentSelect}
                    />
                </div>
                
                <DataDisplay
                    survey = { this.survey } 
                    data = { this.state.surveyData }
                    selectedGroup = { this.state.selectedGroup }
                    selectedQuestion = { this.state.selectedContent } 
                />
            </div>
        )
    }

    componentDidMount() {
        if(!this.survey){
            return;
        }
        document.title = this.survey.title;
        if(this.surveyId in dataCache) {
            this.setState({
                surveyData : dataCache[this.surveyId]
            });
        }
        else {
            d3.csv(`${process.env.PUBLIC_URL}/data/data_${this.surveyId}.csv`).then((data) => {
                dataCache[this.surveyId] = data; 
                this.setState({
                  surveyData : data
                })
              });
        }
      }

    handleGroupSelect(selectedGroup) {
        this.setState({
            selectedGroup : selectedGroup
        })
    }

    handleContentSelect(selectedContent) {
        this.setState({
            selectedContent : selectedContent
        })
    }
}

DataPage.propTypes = {
    survey : PropTypes.object
}