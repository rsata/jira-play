import React, { Component } from 'react';
import { GraphPie } from './PieChart';
import { GraphBar } from './BarChart';
import { GraphRadial } from './RadialChart';

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
      chartDataPie: [],
      chartDataBar: [],
      colors: [],
      sortedDataByType: {},
      sortedDataByAssignee: {
        unassigned: []
      },
      chartJSData: [],
      chartJSLabels: []
    };
  }

  componentDidMount() {
    this.getData(query);
    // this.sortDataByType();
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
      .then(() => this.sortDataByType())
      .then(() => this.sortDataByAssignee())
      .then(() => this.makeChartDataPie())
      .then(() => this.makeChartDataBar())
      .then(() => this.sortData())
      .then(() => this.makeColors());
      // .then(() => this.sortDataByType())
      // .then(() => this.sortDataByAssignee())
      // .then(() => this.makeChartDataPie())
      // .then(() => this.makeChartDataBar())
      // .then(() => this.makeColors());
  }

  sortData() {
    this.state.data.issues.forEach(x => {
      let s = this.state.chartData;
      let item = {};

      if (!x.fields.assignee) {
        item.assignee = 'unassigned';
      } else {
        item.assignee = x.fields.assignee.displayName;
      }

      item.assigneeLoad = this.state.sortedDataByAssignee[x.fields.assignee.displayName].length;
      item.type = x.fields.customfield_10903.value;
      item.status = x.fields.status.name;

      s.push(item);
      this.setState({chartData: s});
    });
  };

  // makeObject(o) {
  //   const obj = o
  //   return obj;
  // }

  sortDataByType() {
    this.state.data.issues.forEach(x => {

      // this method only counts first label of a jira ticket - could also loop though those with multiple, however, they will count more than once
      // if (x.fields.customfield_10903.value === 0) {
      //   let s = this.state.sortedDataByType;
      //   s['undefined'].push(x);
      //   this.setState({sortedDataByType: s});
      // }
      if (this.state.sortedDataByType[x.fields.customfield_10903.value] === undefined) {
        let s = this.state.sortedDataByType;
        s[x.fields.customfield_10903.value] = [x];
        this.setState({sortedDataByType: s});
      }
      if (this.state.sortedDataByType[x.fields.customfield_10903.value] !== undefined) {
        let s = this.state.sortedDataByType;
        s[x.fields.customfield_10903.value].push(x);
        this.setState({sortedDataByType: s});
      }
    });
  }

  sortDataByAssignee() {
    this.state.data.issues.forEach(x => {
      if (!x.fields.assignee) {
        let s = this.state.sortedDataByAssignee;
        s['unassigned'].push(x);
        this.setState({sortedDataByAssignee: s});
        return undefined;
      }
      if (this.state.sortedDataByAssignee[x.fields.assignee.displayName] === undefined) {
        let s = this.state.sortedDataByAssignee;
        s[x.fields.assignee.displayName] = [x];
        this.setState({sortedDataByAssignee: s});
        return undefined;
      }
      if (this.state.sortedDataByAssignee[x.fields.assignee.displayName] !== undefined) {
        let s = this.state.sortedDataByAssignee;
        s[x.fields.assignee.displayName].push(x);
        this.setState({sortedDataByAssignee: s});
      }
    });
  }

  makeChartDataPie() {
    for (let key = 0; key < Object.keys(this.state.sortedDataByType).length; key++) {
      let s = this.state.chartDataPie;
      s.push({
        name: Object.keys(this.state.sortedDataByType)[key],
        value: this.state.sortedDataByType[Object.keys(this.state.sortedDataByType)[key]].length
      });
      this.setState({chartDataPie: s});
    }
  }

  makeChartDataBar() {
    for (let key = 0; key < Object.keys(this.state.sortedDataByAssignee).length; key++) {
      let s = this.state.chartDataBar;
      s.push({
        name: Object.keys(this.state.sortedDataByAssignee)[key],
        value: this.state.sortedDataByAssignee[Object.keys(this.state.sortedDataByAssignee)[key]].length
      });
      this.setState({chartDataBar: s});
    }
  }

  // makeChartJSData() {
  //   for (let key = 0; key < Object.keys(this.state.sortedDataByType).length; key++) {
  //     let s = this.state.chartJSData;
  //     s.push(this.state.sortedDataByType[Object.keys(this.state.sortedDataByType)[key]].length);
  //     this.setState({chartJSData: s});
  //   }
  // }
  //
  // makeChartJSLabels() {
  //   for (let key = 0; key < Object.keys(this.state.sortedDataByType).length; key++) {
  //     let s = this.state.chartJSLabels;
  //     s.push(Object.keys(this.state.sortedDataByType)[key]);
  //     this.setState({chartJSLabels: s});
  //   }
  // }

  generateColor() {
    const r = (Math.round(Math.random()* 127) + 127).toString(16);
    const g = (Math.round(Math.random()* 127) + 127).toString(16);
    const b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
  }

  makeColors() {
    for (let key = 0; key < this.state.chartDataPie.length; key++) {
      let c = this.state.colors;
      c.push(this.generateColor());
      this.setState({colors: c});
    }
  }

  render() {
    if (!this.state.data) return (<div>Loading...</div>);

    return (
      <div className="App">
        <h1>Unresolved issues: {this.state.data.issues.length}</h1>
        <GraphPie chartDataPie={this.state.chartDataPie} colors={this.state.colors} />
        <GraphRadial chartDataPie={this.state.chartDataPie} />
        <GraphBar chartDataBar={this.state.chartDataBar} />
        {/* <Chart type='pie' data={this.state.chartJSData} labels={this.state.chartJSLabels} /> */}
      </div>
    );
  }
}

export default App;
