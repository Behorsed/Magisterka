import React, { Component } from 'react'


class Stats extends Component { // reusable component to

    render() {
        const avg = this.props.avg;
        const stdDev = this.props.stdDev;
        const timeListLength = this.props.timeListLength;
        if (timeListLength === 0) {
            return (null);
        }

        return (
            <div>
                <p> Average: {avg} ms, Standard deviation: {stdDev} ms </p>
            </div>
        )
    }
}
export default Stats