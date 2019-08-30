import React, {Component} from 'react';

class Buttons extends Component {
    render() {
        return (
            <div>
                <button className="btn" id='simple-menu' onClick={() => this.props.onMenuClick()}>Menu</button>
                <button className="btn" id='simple-reset' onClick={() => this.props.onResetClick()}>Reset</button>
            </div>
        )
    }
}
export default Buttons