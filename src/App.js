import React, { Component } from 'react';
import './App.css';
import {groups, surveys} from './config/fields.json'
import NavigationBar from './components/NavigationBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar surveys={surveys}/>
      </div>
    );
  }
}

export default App;
