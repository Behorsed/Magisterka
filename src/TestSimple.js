import React, {Component} from 'react';
import Stats from "./Stats";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Circle from "./Circle";
const speed = 2000;
class Buttons extends Component {
    render() {
        return (
            <div>
                <button className="btn" onClick={() => this.props.onMenuClick()}>Menu</button>
                <button className="btn" onClick={() => this.props.onResetClick()}>Reset</button>
            </div>
        )
    }
}


class TestSimple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeListSimple: [],
            timeAppeared: null,
            source: '',
            avg: null,
            stdDev: null,
            resetClicked: false
        };
        setTimeout(
            function() {
                this.setState({source: "/circle.jpg", timeAppeared: Date.now()});
                //  make it reappear after a random time
            }
                .bind(this),
            speed // additional time at the beginning
        );
    }
    handleCircle() {
        this.setState({
            source: '',
        })

    }
    handleResetClick() {
        this.setState({
            timeListSimple: [],
            source: '',
            resetClicked: true,
        });
    }
    componentDidUpdate(prevProps, prevState) {
        let time;
        if (this.state.resetClicked === true) {
            setTimeout(
                function() {
                    this.setState({resetClicked: false, source: "/circle.jpg"});
                    //  make it reappear after a random time

                }
                    .bind(this),
                speed
            )
        }
        else if ((prevState.source === "/circle.jpg" && this.state.source ===
            '')) { // if the circle disappeared
            let timeClicked = Date.now();
            time = Math.random()*speed;

                this.setState({ timeListSimple: [...this.state.timeListSimple, timeClicked - prevState.timeAppeared] });

            setTimeout(
                function() {
                    this.setState({source: "/circle.jpg", timeAppeared: Date.now()});
                    //  make it reappear after a random time
                }
                    .bind(this),
                time
            );

        }

    }

    average(data){
        const sum = data.reduce(function(sum, value){
            return sum + value;
        }, 0);

        const avg = sum / data.length;
        return avg;
    }
    render() {
        const source = this.state.source;
        const timeList = this.state.timeListSimple;
        const avg = Math.round(this.average(timeList));
        let stdDevElements = timeList.map(function(value){
            let diff = value - avg; //(x-x_mean)
            return diff * diff; // (x-x_mean)^2
        });
        const avgElements = this.average(stdDevElements); ////  (x-x_mean)^2 / N
        const stdDev = Math.round(Math.sqrt(avgElements));
        const timeListLength = timeList.length
        let low = 0; // tries lower than avg - stdDev
        let medium = 0; // tries between avg - stdDev and avg + stdDev
        let high = 0; // tries higher than avg + stdDev
        for(let i = 0; i < timeListLength; ++i){
            if(timeList[i] < avg - stdDev)
            {low++;}
            else if(timeList[i] >= avg - stdDev && timeList[i] <= avg + stdDev)
            {medium++;}
            else if (timeList[i] > avg + stdDev)
            {high++;}
        }
        const pieData = [
            {
                "label": "< Average - Standard Deviation",
                "value": low
            },
            {
                "label": "> Average - Standard Deviation and < Average + Standard Deviation",
                "value": medium
            },
            {
                "label": "> Average + Standard Deviation",
                "value": high
            }
        ]
        return (
            <div>
                <Buttons onMenuClick={() => this.props.onMenuClick()} onResetClick={() => this.handleResetClick()}/>
                <div className = "fixed">
                    <Circle onCircleClick={() => this.handleCircle(this.state.source)} source = {source}/>
                    <Stats className = "simple" stdDev = { stdDev } avg = { avg } timeListLength = { timeListLength } />
                </div>

                <div className = "row">
                    <div>
                        <BarChart
                            data={timeList}
                            title="Reaction Time History"
                            color="#d25d5d"
                        />
                    </div>
                    <div>
                        <PieChart
                            data={pieData}
                            title="Number of tries in relation to average"
                            colors = {['#eeac99', '#e06377', '#c83349']}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default TestSimple