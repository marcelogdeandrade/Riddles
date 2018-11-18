import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import RiddleContainer from './components/Riddle/RiddleContainer'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={RiddleContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
