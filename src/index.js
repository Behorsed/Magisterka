import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TestSimple from './TestSimple.js';
import TestDisc from './TestDisc.js';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startPage: true,
            isSimple: true
        };
    }
    handleMenuClick() {
        this.setState({
            startPage: true,
        });
    }

    handleStartSimpleClick() {
        this.setState({
            startPage: false,
            isSimple: true,
        });
    }
    handleStartDiscClick() {
        this.setState({
            startPage: false,
            isSimple: false,
        });
    }

    render() {
        return(
            this.state.startPage ? <div>< // if start page true, returns to menu
                Title
                onStartSimpleClick = {() => this.handleStartSimpleClick()} onStartDiscClick = {() => this.handleStartDiscClick()}/></div> : ( this.state.isSimple ?
                <div><TestSimple // checks if simple, if so, opens Simple Reaction Test, if not, Discrimination
                onMenuClick={() => this.handleMenuClick()}
                /> </div>  : <div><TestDisc
                    onMenuClick={() => this.handleMenuClick()}
                /> </div>)
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
                <button className="btnsimple" onClick={() => this.props.onStartSimpleClick()}>SRT test</button>
                </div>
                <div id = "disc">
                    <h1>Discrimination reaction time (DRT) test</h1>
                    <p>Rules: click on the pink circle as soon as it
                        appears on the screen. The application will measure the time you needed to react.
                        Ignore the blue circle! </p>
                    <button className="btndisc" onClick={() => this.props.onStartDiscClick()}>DRT test</button>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
