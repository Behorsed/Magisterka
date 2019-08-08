import React, {Component} from 'react';

class Title extends Component {
    render() {
        return (
            <div id="title">
                <div className = "simple">
                    <h1>Simple reaction time (SRT) test </h1>
                    <p>Rules: click on the circle as soon as it appears on the screen. The application will measure the time you needed to react.</p>
                    <button className="btnsimple" onClick={() => this.props.onStartSimpleClick()}>SRT test</button>
                </div>
                <div id = "disc">
                    <h1>Discrimination reaction time (DRT) test</h1>
                    <p>Rules: click on the pink circle as soon as it appears on the screen. The application will measure the time you needed to react. Ignore the blue circle!</p>
                    <button className="btndisc" onClick={() => this.props.onStartDiscClick()}>DRT test</button>
                </div>
            </div>
        );
    }
}

export default Title