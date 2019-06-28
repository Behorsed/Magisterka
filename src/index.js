import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startPage: true,
            source: 'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg',
        };
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
        return(
            this.state.startPage ? <
                Title
                onClick = {() => this.handleClick()}/> :
                <Test
                onClick={() => this.handleClick()} onCircleClick={() => this.handleCircle()}
                source = { source }
                />
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
                <button class="btn" onClick={() => this.props.onClick()}>Start</button>
            </div>
        );
    }
}
class Buttons extends Component {
    render() {
        return (
            <button class="btn" onClick={() => this.props.onClick()}>Menu</button>
        )
    }
}
class Circle extends Component {
    render() {
        return (
            <img src={this.props.source} onClick={() => this.props.onCircleClick()}/>
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
