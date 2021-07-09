import React, { Component } from 'react';
import Synth from './components/SynthComponent';
import addKnobs from './shared/input-knobs';
import './App.css';

class App extends Component {

  componentDidMount() {
    addKnobs();
  }

  render() {
    return (
      <div className="App">
          <Synth />
      </div>
    );
  };
};

export default App;
