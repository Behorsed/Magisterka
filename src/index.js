import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Table from './Table.js'
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startPage: true,
            source: "/circle.gif",
            timeList: [],
            timeAppeared: Date.now(),
        };
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
            this.setState({ timeList: [...this.state.timeList, timeClicked - prevState.timeAppeared] });
        }
    }
    handleClick() {
        const startPage = this.state.startPage;
        this.setState({
            startPage: !startPage,
        });
    }
    handleCircle() {
        this.setState({
            source: '',
        })

    }
    render() {
        const source = this.state.source;
        const timeList = this.state.timeList;
        return(
            this.state.startPage ? <div><
                Title
                onClick = {() => this.handleClick()}/><Table timeList = {timeList}/></div> :
                <div><Test
                onClick={() => this.handleClick()} onCircleClick={() => this.handleCircle()}
                source = { source }
                /> <Table timeList = {timeList}/> </div>
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
                <button className="btn" onClick={() => this.props.onClick()}>Start</button>
            </div>
        );
    }
}
class Buttons extends Component {
    render() {
        return (
            <button className="btn" onClick={() => this.props.onClick()}>Menu</button>
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

    render() {
        const source = this.props.source;
        return (
            <div>
                <Buttons onClick={() => this.props.onClick()}/>
                <Circle onCircleClick={() => this.props.onCircleClick()} source = {source}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
