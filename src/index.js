import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Table from './Table.js'
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
            <button className="btn" onClick={() => this.props.onMenuClick()}>Menu</button>
        )
    }
}
class Circle extends Component {

    render() {
        return (
            <img alt = '' src={this.props.source} onClick={() => this.props.onCircleClick()}/>
        )
    }
}
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeListSimple: [],
            timeAppeared: Date.now(),
            source: '/circle.gif'
        };
    }
    handleCircle() {
        this.setState({
            source: '',
        })

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.source === "/circle.gif" && this.state.source === '') { // if the circle disappeared
            let timeClicked = Date.now();
            let time = Math.random()*3000;
            setTimeout(
                function() {
                    this.setState({source: "/circle.gif", timeAppeared: Date.now()});
                    // letTime// make it reappear after a random time
                }
                    .bind(this),
                time
            );
            this.setState({ timeListSimple: [...this.state.timeListSimple, timeClicked - prevState.timeAppeared] });
        }
    }
    render() {
        const source = this.state.source;
        return (
            <div>
                <Buttons onMenuClick={() => this.props.onMenuClick()}/>
                <Circle onCircleClick={() => this.handleCircle()} source = {source}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
