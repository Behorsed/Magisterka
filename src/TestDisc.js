import React, {Component} from 'react';
import Stats from "./Stats";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import Buttons from "./Buttons"
import Circle from "./Circle";
const speed = 2000;
const freq = 0.5;

class BlueClicked extends Component {
    render() {
        return (
            this.props.blueClicked ? <p className = "wrong"> WRONG!</p> : <p> </p>
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
            avg: 0,
            stdDev: null,
            blueClicked: false,
            resetClicked:false
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
        const time = Math.random() * speed;
        if (source === "/circle.jpg") {
            this.setState({
                source: '',
            })
            let timeClicked = Date.now();
            const time = Math.random() * speed;

            this.setState({timeListDisc: [...this.state.timeListDisc, timeClicked - this.state.timeAppeared]});

        } else if (source === "/circleblue.jpg") { //if blue circle clicked
            this.setState({
                source: '', blueClicked: true,
            })
        }

    }
    handleResetClick() {
        if (this.state.resetClicked === false) {
            this.setState({
                timeListDisc: [],
                source: '',
                avg: 0,
                stdDev: null,
                blueClicked: false,
                resetClicked: true,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const time = Math.random() * speed;
        if (this.state.source ===
            "/circleblue.jpg") {
            setTimeout(
                function () {
                    if (this.state.source ===
                        "/circleblue.jpg") {
                    this.setState({
                        source: ''
                    });
                    }

            }
                    .bind(this),
                time
            )
        }
        if (this.state.source ===
            "") {
            setTimeout(
                function () {
                    if (this.state.source ===
                        "") {
                        this.setState({
                            source:Math.random() > freq ? "/circle.jpg" : "/circleblue.jpg", timeAppeared: Date.now(), resetClicked:false, blueClicked: false
                        });
                    }

                }
                    .bind(this),
                time
            )
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
                <Buttons menu='disc-menu' reset='disc-reset' onMenuClick={() => this.props.onMenuClick()} onResetClick={() => this.handleResetClick()}/>
                    <div className = "fixed">
                        <div> <Circle onCircleClick={() => this.handleCircle(this.state.source)} source = { source }/></div>
                        <div className = "row"> <div> <BlueClicked blueClicked = { blueClicked } /> </div>
                            <div>  <Stats className = "stats disc" stdDev = { stdDev } avg = { avg } /> </div></div>
                    </div>
                <div className = "row">
                    <div>
                        <BarChart className='chart'
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