import React, { Component } from 'react';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';

class Output extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='col d-flex flex-column justify-content-center align-items-center pt-5 pb-3 output border'>
                <label htmlFor='output__volume'>VOLUME</label>
                <Knob
                    className='output__volume'
                    id='output__volume'
                    value={this.props.output.volume}
                    min={0}
                    max={1}
                    step={0.01}
                    rotateDegrees={180}
                    clampMin={30}
                    clampMax={330}
                    skin={skins.s16}
                    preciseMode={false}
                    onChange={value => this.props.handleOnChange(value, 'output', 'volume')}
                />
                <h3 className='text-center mt-auto'>OUTPUT</h3>
            </div>
        );
    }
};

export default Output;