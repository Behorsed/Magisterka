import React, {Component} from 'react';
import Stats from "./Stats";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import Buttons from "./Buttons"
import Circle from "./Circle";
const speed = 2000;


class TestSimple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeList: [],
            timeAppeared: null,
            source: '',
            avg: 0,
            stdDev: null,
        };
        this.handleCircle = this.handleCircle.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.average = this.average.bind(this);
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
    let time;
    let timeClicked = Date.now();
    time = Math.random()*speed;

    this.setState({ timeList: [...this.state.timeList, timeClicked - this.state.timeAppeared] });

    setTimeout(
    function() {
        this.setState({source: "/circle.jpg", timeAppeared: Date.now()});
        //  make it reappear after a random time
    }
.bind(this),
    time
);


}
    handleResetClick() {
        this.setState({
            timeList: [],
            source: '',
        });
        setTimeout(
            function() {
                this.setState({source: "/circle.jpg", timeAppeared: Date.now()});
                //  make it reappear after a random time

            }
                .bind(this),
            Math.random()*speed
        )
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
        const timeList = this.state.timeList;
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
        const doughnutData = [
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
            <div id = "test-simple">
                <Buttons menu='simple-menu' reset='simple-reset' onMenuClick={() => this.props.onMenuClick()} onResetClick={() => this.handleResetClick()}/>
                <div className = "fixed">
                    <Circle onCircleClick={() => this.handleCircle()} source = {source}/>
                    <Stats className = "stats simple" stdDev = { stdDev } avg = { avg } />
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
                        <DoughnutChart
                            data={doughnutData}
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