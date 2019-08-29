import React, {Component} from 'react';
import Stats from "./Stats";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import Circle from "./Circle";
const speed = 2000;
const freq = 0.5;
class Buttons extends Component {
    render() {
        return (
            <div>
                <button className="btn" id='disc-menu' onClick={() => this.props.onMenuClick()}>Menu</button>
                <button className="btn" id='disc-reset' onClick={() => this.props.onResetClick()}>Reset</button>
            </div>
        )
    }
}

class BlueClicked extends Component {
    render() {
        return (
            this.props.blueClicked ? <p className = "simple"> WRONG!</p> : <p> </p>
        )
    }
}

class TestDisc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeListDisc: [],
            timeAppeared: null,
            source: '',
            avg: null,
            stdDev: null,
            blueClicked: false,
        };
        this.handleCircle = this.handleCircle.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.average = this.average.bind(this);
        setTimeout(
            function() {
                this.setState({source: Math.random() > freq ? "/circle.jpg" : "/circleblue.jpg", timeAppeared: Date.now()});
                //  make it reappear after a random time
            }
                .bind(this),
            speed // additional time at the beginning
        );
    }
    handleCircle(source) {
        if (source === "/circle.jpg") {
            this.setState({
                source: '',
            })
            let timeClicked = Date.now();
            const time = Math.random() * 2000;

            this.setState({timeListDisc: [...this.state.timeListDisc, timeClicked - this.state.timeAppeared]});

            setTimeout(
                function () {
                    this.setState({
                        source: Math.random() > freq ? "/circle.jpg" : "/circleblue.jpg",
                        timeAppeared: Date.now()
                    }); // randomly display blue or pink circle
                    //  make it reappear after a random time
                }
                    .bind(this),
                time
            );

        } else if (source === "/circleblue.jpg") {
            this.setState({
                source: '', blueClicked: true,
            })
            setTimeout(
                function () {
                    this.setState({blueClicked: false, source: "/circle.jpg", timeAppeared: Date.now()});

                }
                    .bind(this),
                speed
            )
        }

    }
    handleResetClick() {
        this.setState({
            timeListDisc: [],
            source: '',
            avg: null,
            stdDev: null
        });
        setTimeout(
            function () {
                this.setState({source: Math.random() > freq ? "/circle.jpg" : "/circleblue.jpg",});


            }
                .bind(this),
            2000
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.source === "/circle.jpg" && this.state.source ===
            '') { // if the circle disappeared

        } else if (prevState.source === "/circleblue.jpg" && this.state.source ===
            '' && prevState.resetCliked !== true) { // if the blue circle disappeared by clicking
            // wrong!
            setTimeout(
                function () {
                    this.setState({
                        source: Math.random() > freq ? "/circle.jpg" : "/circleblue.jpg",
                        timeAppeared: Date.now()
                    });
                    //  make it reappear after random time
                }
                    .bind(this),
                speed
            );

        }
        else if (this.state.source ===
            "/circleblue.jpg") { // if the blue circle stays

            setTimeout(
                function () {
                    this.setState({
                        source: '',
                    });
                    //  make it reappear after a random time
                }
                    .bind(this),
                speed
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
        const timeList = this.state.timeListDisc
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
            <div id = 'test-disc'>
                <Buttons onMenuClick={() => this.props.onMenuClick()} onResetClick={() => this.handleResetClick()}/>
                    <div className = "fixed row">
                        <Circle onCircleClick={() => this.handleCircle(this.state.source)} source = { source }/>
                        <BlueClicked blueClicked = { blueClicked } />
                        <Stats className = "stats disc" stdDev = { stdDev } avg = { avg } />
                    </div>
                <div className = "row">
                    <div>
                        <BarChart
                            data={ timeList }
                            title="Reaction Time History"
                            color="#48aaf3"
                        />
                    </div>
                    <div>
                        <DoughnutChart
                            data={ pieData }
                            title="Number of tries in relation to average"
                            colors = {['#b4e7ff', '#78acd7', '#48aaf3']}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default TestDisc