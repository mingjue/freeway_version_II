import React, { Component } from "react";
import Chart from "react-apexcharts";

class Graph extends Component {

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.props.graphData.options}
              series={this.props.graphData.series}
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}
  export default Graph