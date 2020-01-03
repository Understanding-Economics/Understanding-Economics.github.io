import React from 'react';
import './App.css';
import {groups, surveys} from './config/fields.json'
import NavigationBar from './components/NavigationBar'
import CrossTabView from './components/CrossTabView'
import ChartView from './components/ChartView'

class App extends React.Component {
  constructor() {
    super(); 
    this.state = {
      surveyData : null,
      selectedGroup : null,
      selectedQuestion : null
    }
  }
  
  render() {
    return (
      <div className="App">
        <NavigationBar surveys={surveys}/>
        <ChartView 
          survey = {surveys.income_survey} 
          data = { this.state.surveyData }
          selectedGroup = { this.state.selectedGroup }
          selectedQuestion = { this.state.selectedQuestion } 
        />
      </div>
    );
  }

  componentDidMount() {
    console.log(`${process.env.PUBLIC_URL}/data/data_income_survey.csv`);
    d3.csv(`${process.env.PUBLIC_URL}/data/data_income_survey.csv`).then((data) => {
      console.log(data);
      this.setState({
        surveyData : data,
        selectedGroup : "income",
        selectedQuestion : "Q06006_en"
      })
    });
  }
}

export default App;
