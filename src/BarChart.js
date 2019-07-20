import {Chart} from 'chart.js'
import React, {Component} from 'react';

Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

// BarChart
class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        let labels = [];
        for(let i=0;i<this.props.data.length;i++){
            labels[i]=this.props.data[i] + " ms";
        }
       // this.myChart.data.labels = Array.from(Array(this.props.data.length), (e,i)=>i+1); ordered list
        this.myChart.data.labels = labels;
        this.myChart.data.datasets[0].data = this.props.data;
        this.myChart.update();
    }

    componentDidMount() {
        let labels = [];
        for(let i=0;i<this.props.data.length;i++){
            labels[i]=this.props.data[i] + " ms";
        }
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'bar',
            options: {
                maintainAspectRatio: false,
            },
            data: {
                labels: labels,
                datasets: [{
                    label: this.props.title,
                    data: this.props.data,
                    backgroundColor: this.props.color
                }]
            }
        });
    }

    render() {
        return (
            <canvas ref={this.canvasRef} />
        );
    }
}

export default BarChart