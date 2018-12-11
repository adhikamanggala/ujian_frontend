import React, { Component } from 'react';

class InputReact extends Component {
    render () {
        return (
            <input type={this.props.type} ref={this.props.innerRef} />
        )
    }
}
export default InputReact;