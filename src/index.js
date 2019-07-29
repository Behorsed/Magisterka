import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Table from './Table.js'
import Stats from './Stats.js'
import BarChart from './BarChart.js'
import PieChart from './PieChart.js'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startPage: true,
        };
    }
    handleMenuClick() {
        this.setState({
            startPage: true,
        });
    }

    handleStartClick() {
        this.setState({
            startPage: false,
        });
    }

    render() {
        return(
            this.state.startPage ? <div><
                Title
                onStartClick = {() => this.handleStartClick()}/></div> :
                <div><Test
                onMenuClick={() => this.handleMenuClick()}
                /> </div>
        );
    }
}
class Title extends Component {

    render() {
        return (
            <div id="title">
                <h1>Reaction</h1>
                <p>Rules: click on the circle as soon as it
                    appears on the screen. The application will measure the time you needed to react.</p>
                <button className="btn" onClick={() => this.props.onStartClick()}>Start</button>
            </div>
        );
    }
}
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

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeListSimple: [],
            timeAppeared: null,
            source: '',
            avg: null,
            stdDev: null
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
    handleCircle() {
        this.setState({
            source: '',
        })

    }
    handleResetClick() {
        this.setState({
            timeListSimple: [],
            timeAppeared: Date.now(),
            source: '',
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.source === "/circle.jpg" && this.state.source === '') { // if the circle disappeared
            let timeClicked = Date.now();
            let time = Math.random()*3000;
            if (this.state.timeListSimple.length >= prevState.timeListSimple.length) // if list was not reset
            {
                this.setState({ timeListSimple: [...this.state.timeListSimple, timeClicked - prevState.timeAppeared] });

            };
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
        const pieData = [
            {
                "label": "< Average - Standard Deviation",
        "value": 1
    },
        {
            "label": "> Average - Standard Deviation and < Average + Standard Deviation",
            "value": 2
        },
            {
                "label": "> Average + Standard Deviation",
                "value": 3
            }
    ]
        return (
            <div>
                <Buttons onMenuClick={() => this.props.onMenuClick()} onResetClick={() => this.handleResetClick()}/>
                <Circle onCircleClick={() => this.handleCircle()} source = {source}/>
                <Stats stdDev = { stdDev } avg = { avg } timeListLength = { timeList.length } />
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

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
