import React, { Component } from 'react';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';
import Switch from 'react-switch';

class Mixer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='col-3 mixer d-flex flex-column py-3 text-center border'>
                <div className='row align-items-end'>
                    <div className='col-3 knob'>
                        <label htmlFor='mixer__volume-one'>VOLUME</label>
                        <Knob
                            className='mixer__volume-one'
                            id='mixer__volume-one'
                            value={this.props.mixer.volumeOne}
                            min={0}
                            max={1}
                            step={0.01}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'volumeOne')}
                        />
                    </div>
                    <div className='col-3 switch'>
                        <Switch
                            className='mixer__volume-one-switch'
                            checked={this.props.mixer.volumeOneSwitch}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'volumeOneSwitch')}
                        />
                    </div>
                    <div className='col-3'>
                        <label htmlFor='mixer__external-input-volume' className='text-nowrap'>EXTERNAL<br/>INPUT VOLUME</label>
                    </div>
                    <div className='col-3 text-center justify-content-center lift'>
                        <label htmlFor='mixer__filter-modulation-switch'>FILTER MODULATION</label>
                        <Switch
                            className='mixer__filter-modulation-switch'
                            id='mixer__filter-modulation-switch'
                            checked={this.props.mixer.filterModulationSwitch}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'filterModulationSwitch')}
                        />
                    </div>
                </div>
                <div className='row align-items-end'>
                    <div className='col-3 offset-3 switch'>
                        <Switch
                            className='mixer__external-input-volume-switch'
                            checked={this.props.mixer.externalInputVolumeSwitch}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'externalInputVolumeSwitch')}
                        />
                    </div>
                    <div className='col-3 knob'>
                        <Knob
                            className='mixer__external-input-volume'
                            id='mixer__external-input-volume'
                            value={this.props.mixer.externalInputVolume}
                            min={0}
                            max={1}
                            step={0.01}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'externalInputVolume')}
                        />
                    </div>
                    <div className='col-3 text-center lift'>
                        <Switch
                            className='mixer__keyboard-control-one'
                            checked={this.props.mixer.keyboardControlOne}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'keyboardControlOne')}
                        />
                    </div>
                </div>
                <div className='row align-items-end'>
                    <div className='col-3 knob'>
                        <Knob
                            className='mixer__volume-two'
                            value={this.props.mixer.volumeTwo}
                            min={0}
                            max={1}
                            step={0.01}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'volumeTwo')}
                        />
                    </div>
                    <div className='col-3 switch'>
                        <Switch
                            className='mixer__volume-two-switch'
                            checked={this.props.mixer.volumeTwoSwitch}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'volumeTwoSwitch')}
                        />
                    </div>
                    <div className='col-3'>
                        <label htmlFor='mixer__noise-volume'>NOISE VOLUME</label>
                    </div>
                    <div className='col-3 text-center lift'>
                        <label htmlFor='mixer__keyboard-control-two'>KEYBOARD CONTROL</label>
                        <Switch
                            className='mixer__keyboard-control-two'
                            id='mixer__keyboard-control-two'
                            checked={this.props.mixer.keyboardControlTwo}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'keyboardControlTwo')}
                        />
                    </div>
                </div>
                <div className='row align-items-end'>
                    <div className='col-3 offset-3 switch'>
                        <Switch
                            className='mixer__noise-volume-switch'
                            checked={this.props.mixer.noiseVolumeSwitch}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'noiseVolumeSwitch')}
                        />
                    </div>
                    <div className='col-3 knob'>
                        <Knob
                            className='mixer__noise-volume'
                            value={this.props.mixer.noiseVolume}
                            min={0}
                            max={1}
                            step={0.01}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'noiseVolume')}
                        />
                    </div>
                    <div className='col-1 text-center'>
                        <Switch
                            className='mixer__keyboard-control-two'
                            id='mixer__keyboard-control-two'
                            checked={this.props.mixer.keyboardControlTwo}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'keyboardControlTwo')}
                        />
                    </div>
                </div>
                <div className='row align-items-end'>
                    <div className='col-3 knob'>
                        <Knob
                            className='mixer__volume-three'
                            value={this.props.mixer.volumeThree}
                            min={0}
                            max={1}
                            step={0.01}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'volumeThree')}
                        />
                    </div>
                    <div className='col-3 switch'>
                        <Switch
                            className='mixer__volume-three-switch'
                            checked={this.props.mixer.volumeThreeSwitch}
                            onChange={value => this.props.handleOnChange(value, 'mixer', 'volumeThreeSwitch')}
                        />
                    </div>
                </div>
                <h3 className='text-center mt-auto'>MIXER</h3>
            </div>
        );
    }
};

export default Mixer;