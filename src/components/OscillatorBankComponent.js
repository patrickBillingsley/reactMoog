import React from 'react';
import Knob from './KnobFunctionalComponent';
import knobConfig from '../shared/KNOB_CONFIG.json';

function OscillatorBank() {
    return(
        <div className='col-2 controllers d-flex flex-column pt-5 pb-3 border'>
            <div className='row m-2'>
                <div className='col-6 knob'>
                    <label htmlFor='range'>RANGE</label>
                    <Knob config={knobConfig.range[0]} />
                </div>
                <div className='col-6 knob'>
                    <label htmlFor='frequency'>FREQUENCY</label>
                    <Knob config={knobConfig.frequency[0]} />
                </div>
            </div>
            <div className='row m-2'>
                <div className='col-12 knob'>
                    <Knob config={knobConfig.frequency[1]} />
                </div>
            </div>
        </div>
    );
}

export default OscillatorBank;