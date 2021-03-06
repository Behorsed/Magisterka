import { Chart } from 'chart.js'
import React, {Component} from 'react';

class DoughnutChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidUpdate() {
        this.doughnutChart.data.labels = this.props.data.map(d => d.label);
        this.doughnutChart.data.datasets[0].data = this.props.data.map(d => d.value);
        this.doughnutChart.update();
    }

    componentDidMount() {
        this.doughnutChart = new Chart(this.chartRef.current, {
            type: 'doughnut',
            data: {
                labels: this.props.data.map(d => d.label),
                datasets: [{
                    data: this.props.data.map(d => d.value),
                    backgroundColor: this.props.colors
                }]
            }
        });
    }

    render() {
        return <canvas ref={this.chartRef} />;
    }
}

export default DoughnutChart