
import React, {Component} from 'react';
class Circle extends Component {

    render() {
        return ( <div className = "circlediv">
                <img className="the-circle" alt = '' src={this.props.source} onClick={() => this.props.onCircleClick()}/>
            </div>
        )
    }
}
export default Circle