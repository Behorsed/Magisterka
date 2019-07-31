import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Test from './Test.js';
// import Table from './Table.js'


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


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
