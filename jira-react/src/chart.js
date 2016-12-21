import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChartJS from 'chart.js';



export default class Chart extends Component {

  constructor() {
    super();
    this.state = {
      labels: null
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({labels: this.props.labels});
    // new ChartJS(ctx, {
    //   type: this.props.type,
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero:true
    //         }
    //       }]
    //     }
    //   }
    // });
    const data = {
      labels: ["undefined",
      "SiteBuild",
      "TemplateEditor",
      "PublicSiteBuild",
      "SET",
      "TechRequest",
      "StandardsLoading",
      "FFL",
      "EngageNY",
      "CustomizedColor",
      "CSKatonahPurple",
      "CSGreenhill",
      "StandardsCopyright",
      "Standards",
      "MapLoading",
      "DataAnalysis",
      "StandardsMaintance",
      "AERO",
      "Sweeps",
      "StandardsPush",
      "standards"],
      // labels: this.props.labels,
      datasets: [
        {
          data: [1,2,3,4,5,5,6,7,7,8,8],
          // backgroundColor: [
          //   "#FF6384",
          //   "#36A2EB",
          //   "#FFCE56"
          // ],
          // hoverBackgroundColor: [
          //   "#FF6384",
          //   "#36A2EB",
          //   "#FFCE56"
          // ]
          options: {
    legend: {
        display: false
    },
    tooltips: {
      display: false
        // callbacks: {
        //    label: function(tooltipItem) {
        //           return tooltipItem.yLabel;
        //    }
        // }
    }
}
        }]
      };

      this.makeChart(data);
  }

  makeChart(data) {

    const ctx = ReactDOM.findDOMNode(this);

    new ChartJS(ctx, {
      type: this.props.type,
      data: data,
      // options: {
      //   legend: {
      //     display: false
      //   },
      //   tooltips: {
      //     enabled: false
      //   }
      // }
    });
  }

  render() {
    // console.log(data.labels);
    console.log(this.state);
    return (
      <canvas />
    );
  }
}
