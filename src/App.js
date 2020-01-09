import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar'
import DataPage from './components/DataPage'
import HomePage from './components/HomePage'
import { Route, Switch, HashRouter as Router } from 'react-router-dom'
import NotFound from './components/NotFound'


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
      <Router basename = "/">
        <div className="App container">
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/survey/:surveyId" component={DataPage}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
