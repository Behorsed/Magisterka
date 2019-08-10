import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Title from './Title.js'
import TestSimple from './TestSimple.js';
import TestDisc from './TestDisc.js';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startPage: true,
            isSimple: true
        };
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleStartSimpleClick = this.handleStartSimpleClick.bind(this);
        this.handleStartDiscClick = this.handleStartDiscClick.bind(this);
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
                Title onStartSimpleClick = {() => this.handleStartSimpleClick()} onStartDiscClick = {() => this.handleStartDiscClick()}/></div> : ( this.state.isSimple ?
                <div><TestSimple // checks if simple, if so, opens Simple Reaction Test, if not, Discrimination
                onMenuClick={() => this.handleMenuClick()}
                /> </div>  : <div><TestDisc
                    onMenuClick={() => this.handleMenuClick()}
                /> </div>)
        );
    }
}
export default App

ReactDOM.render(<App />, document.getElementById('root'));
