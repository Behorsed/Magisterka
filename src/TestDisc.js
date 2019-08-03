import React, {Component} from 'react';
import Stats from "./Stats";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

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
class Circle extends Component {

    render() {
        return (
            <img className="the-circle" alt = '' src={this.props.source} onClick={() => this.props.onCircleClick()}/>
        )
    }
}
class BlueClicked extends Component {

    render() {
        return (
            this.props.blueClicked ? <p> WRONG!</p> :  <p> </p>
        )
    }
}

class TestDisc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeListSimple: [],
            timeAppeared: null,
            source: '',
            avg: null,
            stdDev: null,
            resetClicked: false,
            blueClicked: false,
        };
        setTimeout(
            function() {
                this.setState({source: "/circle.jpg", timeAppeared: Date.now()});
                //  make it reappear after a random time
            }
                .bind(this),
            3000 // additional time at the beginning
        );
    }
    handleCircle(source) {
        if (source === "/circle.jpg") {
            this.setState({
                source: '',
            })
        } else if (source === "/circleblue.jpg") {
            this.setState({
                source: '', blueClicked: true,
            })
            setTimeout(
                function () {
                    this.setState({blueClicked: false, source: "/circle.jpg"});

                }
                    .bind(this),
                3000
            )
        }

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
        if (this.state.resetClicked === true) { //additional time after reset
            setTimeout(
                function () {
                    this.setState({resetClicked: false, source: Math.random() > 0.5 ? "/circle.jpg" : "/circleblue.jpg",});


                }
                    .bind(this),
                3000
            )
        } else if ((prevState.source === "/circle.jpg" && this.state.source ===
            '')) { // if the circle disappeared
            let timeClicked = Date.now();
            time = Math.random() * 3000;

            this.setState({timeListSimple: [...this.state.timeListSimple, timeClicked - prevState.timeAppeared]});

            setTimeout(
                function () {
                    this.setState({
                        source: Math.random() > 0.5 ? "/circle.jpg" : "/circleblue.jpg",
                        timeAppeared: Date.now()
                    }); // randomly display blue or pink circle
                    //  make it reappear after a random time
                }
                    .bind(this),
                time
            );

        } else if ((prevState.source === "/circleblue.jpg" && this.state.source ===
            '')) { // if the blue circle disappeared
            // wrong!
            setTimeout(
                function () {
                    this.setState({
                        source: Math.random() > 0.5 ? "/circle.jpg" : "/circleblue.jpg",
                        timeAppeared: Date.now()
                    });
                    //  make it reappear after a random time
                }
                    .bind(this),
                3000
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
        const blueClicked = this.state.blueClicked;
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
                <div className = "row">
                    < div>
                        <Circle onCircleClick={() => this.handleCircle(this.state.source)} source = {source}/>
                    </div>
                    <div>
                        <BlueClicked blueClicked = {blueClicked}/>
                    </div>
                </div>
                <Stats stdDev = { stdDev } avg = { avg } timeListLength = { timeListLength } />
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
export default TestDisc