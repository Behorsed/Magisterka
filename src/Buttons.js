import React, {Component} from 'react';

class Buttons extends Component {
    render() {
        const menu = this.props.menu;
        const reset = this.props.reset
        return (
            <div>
                <button className="btn menu" id={menu} onClick={() => this.props.onMenuClick()}>Menu</button>
                <button className="btn reset" id={reset} onClick={() => this.props.onResetClick()}>Reset</button>
            </div>
        )
    }
}
export default Buttons