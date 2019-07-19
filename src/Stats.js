import React, { Component } from 'react'


class Stats extends Component { // reusable component to

    average(data){
        const sum = data.reduce(function(sum, value){
            return sum + value;
        }, 0);

        const avg = sum / data.length;
        return avg;
    }
    render() {
        const timeList = this.props.timeList;
        if (timeList.length === 0) {
            return (null);
        }

        const avg = Math.round(this.average(timeList));
        let stdDevElements = timeList.map(function(value){
            let diff = value - avg; //(x-x_mean)
            return diff * diff; // (x-x_mean)^2
        });
        const avgElements = this.average(stdDevElements); ////  (x-x_mean)^2 / N
        const stdDev = Math.round(Math.sqrt(avgElements));
        return (
            <div>
                <p> Average: {avg} ms</p>
                <p> Standard deviation: {stdDev} ms </p>
            </div>
        )
    }
}
export default Stats