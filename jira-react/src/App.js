import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch('http://localhost:3001/api/get', {
      method: 'GET'
    })
      .then(r => r.json())
      .then(data => console.log(data))
  }

  render() {

    if (!this.state.data) return (<div>Loading...</div>)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
