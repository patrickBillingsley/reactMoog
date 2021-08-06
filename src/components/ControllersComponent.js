import React from 'react';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';
import Switch from 'react-switch';

function Controllers(props) {
    const { handleKnobChange, handleSwitchChange } = props;

    return(
        <div className='col-2 controllers d-flex flex-column pt-5 pb-3 border'>
            <div className='row m-2'>
                <div className='col-12 knob'>
                    <label htmlFor='controllers__tune'>TUNE</label>
                    <Knob
                        className='controllers__tune'
                        id='controllers__tune'
                        value={props.controllers.tune}
                        min={-500}
                        max={500}
                        step={1}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'controllers', 'tune')}
                    />
                </div>
            </div>
            <div className='row m-2'>
                <div className='col-6 knob'>
                    <label htmlFor='controllers__glide'>GLIDE</label>
                    <Knob
                        className='controllers__glide'
                        id='controllers__glide'
                        value={props.controllers.glide}
                        min={0}
                        max={10}
                        step={0.01}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'controllers', 'glide')}
                    />
                </div>
                <div className='col-6 knob'>
                    <label htmlFor='controllers__modulation-mix'>MODULATION MIX</label>
                    <Knob
                        className='controllers__modulation-mix'
                        id='controllers__modulation-mix'
                        value={props.controllers.modulationMix}
                        min={0}
                        max={10}
                        step={0.01}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'controllers', 'modulationMix')}
                    />
                </div>
            </div>
            <div className='row m-2 mt-5'>
                <div className='col-6 d-flex justify-content-center switch'>
                    <Switch
                        className='controllers__oscillator-three-switch'
                        checked={props.controllers.oscillatorThreeSwitch}
                        onChange={value => handleSwitchChange(value, 'controllers', 'oscillatorThreeSwitch')}
                    />
                </div>
                <div className='col-6 d-flex justify-content-center switch'>
                    <Switch
                        className='col-6 controllers__noise-switch'
                        checked={props.controllers.noiseSwitch}
                        onChange={value => handleSwitchChange(value, 'controllers', 'noiseSwitch')}
                    />
                </div>
            </div>
            <h3 className='text-center mt-auto'>CONTROLLERS</h3>
        </div>
    );
}

export default Controllers;