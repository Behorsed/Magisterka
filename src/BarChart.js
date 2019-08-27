import { Chart } from 'chart.js'
import React, {Component} from 'react';

Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

// BarChart
class BarChart extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        const labels = this.props.data.map((e) => e + ' ms')
       // this.doughnutChart.data.labels = Array.from(Array(this.props.data.length), (e,i)=>i+1); ordered list
        this.barChart.data.labels = labels;
        this.barChart.data.datasets[0].data = this.props.data;
        this.barChart.update();
    }

    componentDidMount() {
        const labels = this.props.data.map((e) => e + ' ms')
        this.barChart = new Chart(this.canvasRef.current, {
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