import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// const query = 'project = DEP AND resolution = unresolved AND assignee = rsata';
// const query = 'resolution = Done AND project = DEP AND createdDate > "2016/01/01"';
// const query = 'resolution = Done AND project = SS AND createdDate > "2016/01/01"';
const query = 'resolution = Unresolved AND project = DEP';

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.getData(query);
  }

  // getData() {
  //   fetch('http://localhost:3001/api/get', {
  //     method: 'GET'
  //   })
  //     .then(r => r.json())
  //     .then(data => console.log(data));
  // }

  getData(query) {
    fetch('http://localhost:3001/api/get', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
      .then(r => r.json())
      .then(data => console.log(data));
  }

  render() {

    if (!this.state.data) return (<div>Loading...</div>);

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
