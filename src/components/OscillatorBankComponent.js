import React from 'react';
import Knob from './KnobFunctionalComponent';
import knobConfig from '../shared/KNOB_CONFIG.json';

function OscillatorBank() {
    return(
        <div className='col-4 controllers d-flex flex-column pt-5 pb-3 border'>
            <div className='row m-2'>
                <div className='col-4 knob'>
                    <label htmlFor='range'>RANGE</label>
                    <Knob config={knobConfig.range[0]} />
                </div>
                <div className='col-4'>
                    <label htmlFor='frequency'>FREQUENCY</label>
                </div>
                <div className='col-4 knob'>
                    <label htmlFor='waveform'>WAVEFORM</label>
                    <Knob config={knobConfig.waveform[0]} />
                </div>
            </div>
            <div className='row m-2'>
                <div className='col-4 knob'>
                    <Knob config={knobConfig.range[1]} />
                </div>
                <div className='col-4 knob'>
                    <Knob config={knobConfig.frequency[0]} />
                </div>
                <div className='col-4 knob'>
                    <Knob config={knobConfig.waveform[1]} />
                </div>
            </div>
            <div className='row m-2'>
                <div className='col-4 knob'>
                    <Knob config={knobConfig.range[2]} />
                </div>
                <div className='col-4 knob'>
                    <Knob config={knobConfig.frequency[1]} />
                </div>
                <div className='col-4 knob'>
                    <Knob config={knobConfig.waveform[2]} />
                </div>
            </div>
        </div>
    );
}

export default OscillatorBank;