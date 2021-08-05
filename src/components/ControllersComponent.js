import React, { Component } from 'react';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';
import Switch from 'react-switch';

class Controllers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='col-2 controllers d-flex flex-column pt-5 pb-3 border'>
                <div className='row m-2'>
                    <div className='col-12 knob'>
                        <label htmlFor='controllers__tune'>TUNE</label>
                        <Knob
                            className='controllers__tune'
                            id='controllers__tune'
                            value={this.props.controllers.tune}
                            min={-500}
                            max={500}
                            step={1}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'controllers', 'tune')}
                        />
                    </div>
                </div>
                <div className='row m-2'>
                    <div className='col-6 knob'>
                        <label htmlFor='controllers__glide'>GLIDE</label>
                        <Knob
                            className='controllers__glide'
                            id='controllers__glide'
                            value={this.props.controllers.glide}
                            min={0}
                            max={10}
                            step={0.01}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'controllers', 'glide')}
                        />
                    </div>
                    <div className='col-6 knob'>
                        <label htmlFor='controllers__modulation-mix'>MODULATION MIX</label>
                        <Knob
                            className='controllers__modulation-mix'
                            id='controllers__modulation-mix'
                            value={this.props.controllers.modulationMix}
                            min={0}
                            max={10}
                            step={0.01}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'controllers', 'modulationMix')}
                        />
                    </div>
                </div>
                <div className='row m-2 mt-5'>
                    <div className='col-6 d-flex justify-content-center switch'>
                        <Switch
                            className='controllers__oscillator-three-switch'
                            checked={this.props.controllers.oscillatorThreeSwitch}
                            onChange={value => this.props.handleOnChange(value, 'controllers', 'oscillatorThreeSwitch')}
                        />
                    </div>
                    <div className='col-6 d-flex justify-content-center switch'>
                        <Switch
                            className='col-6 controllers__noise-switch'
                            checked={this.props.controllers.noiseSwitch}
                            onChange={value => this.props.handleOnChange(value, 'controllers', 'noiseSwitch')}
                        />
                    </div>
                </div>
                <h3 className='text-center mt-auto'>CONTROLLERS</h3>
            </div>
        );
    }
};

export default Controllers;