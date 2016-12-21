import React, { Component } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
// import Chart from './chart';

import './App.css';

// const query = 'project = DEP AND resolution = unresolved AND assignee = rsata';
// const query = 'resolution = Done AND project = DEP AND createdDate > "2016/01/01"';
// const query = 'resolution = Done AND project = SS AND createdDate > "2016/01/01"';
const query = 'resolution = Unresolved AND project = DEP';

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: null,
      chartData: [],
      sortedData: {
        'undefined': []
      },
      chartJSData: [],
      chartJSLabels: []
    };
  }

  componentDidMount() {
    this.getData(query);
    // this.sortData();
  }

  componentWillReceiveProps(props) {
  	this.chart.highcharts().series[0].setData(props.data);
  }

  getData(query) {
    fetch('http://localhost:3001/api/get', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
      .then(r => r.json())
      .then(data => this.setState({data}))
      .then(() => this.sortData())
      .then(() => this.makeChartData())
      .then(() => this.makeChartJSData())
      .then(() => this.makeChartJSLabels());
  }

  sortData() {
    this.state.data.issues.forEach(x => {
      // this method only counts first label of a jira ticket - could also loop though those with multiple, however, they will count more than once
      if (x.fields.labels.length === 0) {
        let s = this.state.sortedData;
        s['undefined'].push(x);
        this.setState({sortedData: s});
      }
      if (this.state.sortedData[x.fields.labels[0]] === undefined) {
        let s = this.state.sortedData;
        s[x.fields.labels[0]] = [x];
        this.setState({sortedData: s});
      }
      if (this.state.sortedData[x.fields.labels[0]] !== undefined) {
        let s = this.state.sortedData;
        s[x.fields.labels[0]].push(x);
        this.setState({sortedData: s});
      }
    });
  }

  makeChartData() {
    for (let key = 0; key < Object.keys(this.state.sortedData).length; key++) {
      let s = this.state.chartData;
      s.push({
        name: Object.keys(this.state.sortedData)[key],
        value: this.state.sortedData[Object.keys(this.state.sortedData)[key]].length
      });
      this.setState({chartData: s});
    }
  }

  makeChartJSData() {
    for (let key = 0; key < Object.keys(this.state.sortedData).length; key++) {
      let s = this.state.chartJSData;
      s.push(this.state.sortedData[Object.keys(this.state.sortedData)[key]].length);
      this.setState({chartJSData: s});
    }
  }

  makeChartJSLabels() {
    for (let key = 0; key < Object.keys(this.state.sortedData).length; key++) {
      let s = this.state.chartJSLabels;
      s.push(Object.keys(this.state.sortedData)[key]);
      this.setState({chartJSLabels: s});
    }
  }

  render() {
    if (!this.state.data) return (<div>Loading...</div>);
    // console.log(this.state);
    return (
      <div className="App">
        <PieChart width={600} height={600}>
          <Pie data={this.state.chartData} cx={300} cy={300} outerRadius={180} width={700} fill='#56C5D0' label />
          <Tooltip/>
        </PieChart>
        {/* <Chart type='pie' data={this.state.chartJSData} labels={this.state.chartJSLabels} /> */}
      </div>
    );
  }
}

export default App;
