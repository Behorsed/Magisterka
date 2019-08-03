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
                <div id = "simple">
                <h1>Simple reaction time (SRT) test </h1>
                <p>Rules: click on the circle as soon as it
                    appears on the screen. The application will measure the time you needed to react.</p>
                <button className="btnsimple" onClick={() => this.props.onStartClick()}>SRT test</button>
                </div>
                <div id = "disc">
                    <h1>Discrimination reaction time (DRT) test</h1>
                    <p>Rules: click on the pink circle as soon as it
                        appears on the screen. The application will measure the time you needed to react.
                        Ignore the blue circle! </p>
                    <button className="btndisc" onClick={() => this.props.onStartClick()}>DRT test</button>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
