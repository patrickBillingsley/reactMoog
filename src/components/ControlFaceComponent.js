import React, { Component } from 'react';

class ControlFace extends Component {
    render() {
        return(
            <div className='row control-face'>
                <input 
                    type='range'
                    max='1'
                    step='0.01'
                    value={this.props.vol}
                    onChange={this.props.updateSynthVol}
                />
            </div>
        );
    }
}

export default ControlFace;