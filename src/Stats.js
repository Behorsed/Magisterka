import React, { Component } from 'react'


class Stats extends Component { // reusable component to

    render() {
        const avg = this.props.avg;
        const stdDev = this.props.stdDev;
        if (isNaN(avg) || avg === 0) {
            return <p> </p>;
        }

        return (
                <p> Average: {avg} ms, Standard deviation: {stdDev} ms </p>
        )
    }
}
export default Stats