import React from 'react';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';
import Switch from 'react-switch';

function Mixer(props) {
    const { handleKnobChange, handleSwitchChange } = props;

    return(
        <div className='col-3 mixer d-flex flex-column py-3 text-center border'>
            <div className='row align-items-end'>
                <div className='col-3 knob'>
                    <label htmlFor='mixer__volume-one'>VOLUME</label>
                    <Knob
                        className='mixer__volume-one'
                        id='mixer__volume-one'
                        value={props.mixer.volumeOne}
                        min={0}
                        max={1}
                        step={0.01}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'mixer', 'volumeOne')}
                    />
                </div>
                <div className='col-3 switch'>
                    <Switch
                        className='mixer__volume-one-switch'
                        checked={props.mixer.volumeOneSwitch}
                        onChange={value => handleSwitchChange(value, 'mixer', 'volumeOneSwitch')}
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
                        checked={props.mixer.filterModulationSwitch}
                        onChange={value => handleSwitchChange(value, 'mixer', 'filterModulationSwitch')}
                    />
                </div>
            </div>
            <div className='row align-items-end'>
                <div className='col-3 offset-3 switch'>
                    <Switch
                        className='mixer__external-input-volume-switch'
                        checked={props.mixer.externalInputVolumeSwitch}
                        onChange={value => handleSwitchChange(value, 'mixer', 'externalInputVolumeSwitch')}
                    />
                </div>
                <div className='col-3 knob'>
                    <Knob
                        className='mixer__external-input-volume'
                        id='mixer__external-input-volume'
                        value={props.mixer.externalInputVolume}
                        min={0}
                        max={1}
                        step={0.01}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'mixer', 'externalInputVolume')}
                    />
                </div>
                <div className='col-3 text-center lift'>
                    <Switch
                        className='mixer__keyboard-control-one'
                        checked={props.mixer.keyboardControlOne}
                        onChange={value => handleSwitchChange(value, 'mixer', 'keyboardControlOne')}
                    />
                </div>
            </div>
            <div className='row align-items-end'>
                <div className='col-3 knob'>
                    <Knob
                        className='mixer__volume-two'
                        value={props.mixer.volumeTwo}
                        min={0}
                        max={1}
                        step={0.01}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'mixer', 'volumeTwo')}
                    />
                </div>
                <div className='col-3 switch'>
                    <Switch
                        className='mixer__volume-two-switch'
                        checked={props.mixer.volumeTwoSwitch}
                        onChange={value => handleSwitchChange(value, 'mixer', 'volumeTwoSwitch')}
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
                        checked={props.mixer.keyboardControlTwo}
                        onChange={value => handleSwitchChange(value, 'mixer', 'keyboardControlTwo')}
                    />
                </div>
            </div>
            <div className='row align-items-end'>
                <div className='col-3 offset-3 switch'>
                    <Switch
                        className='mixer__noise-volume-switch'
                        checked={props.mixer.noiseVolumeSwitch}
                        onChange={value => handleSwitchChange(value, 'mixer', 'noiseVolumeSwitch')}
                    />
                </div>
                <div className='col-3 knob'>
                    <Knob
                        className='mixer__noise-volume'
                        value={props.mixer.noiseVolume}
                        min={0}
                        max={1}
                        step={0.01}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'mixer', 'noiseVolume')}
                    />
                </div>
                <div className='col-1 text-center'>
                    <Switch
                        className='mixer__white-pink-switch'
                        checked={props.mixer.whitePinkSwitch}
                        onChange={value => handleSwitchChange(value, 'mixer', 'whitePinkSwitch')}
                    />
                </div>
            </div>
            <div className='row align-items-end'>
                <div className='col-3 knob'>
                    <Knob
                        className='mixer__volume-three'
                        value={props.mixer.volumeThree}
                        min={0}
                        max={1}
                        step={0.01}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'mixer', 'volumeThree')}
                    />
                </div>
                <div className='col-3 switch'>
                    <Switch
                        className='mixer__volume-three-switch'
                        checked={props.mixer.volumeThreeSwitch}
                        onChange={value => handleSwitchChange(value, 'mixer', 'volumeThreeSwitch')}
                    />
                </div>
            </div>
            <h3 className='text-center mt-auto'>MIXER</h3>
        </div>
    );
}

export default Mixer;