import React from 'react';
import Knob from './KnobFunctionalComponent';
import knobConfig from '../shared/knobConfig.json';

function OscillatorBank() {
    return(
        <div className='col-2 controllers d-flex flex-column pt-5 pb-3 border'>
            <div className='row m-2'>
                <div className='col-12 knob'>
                    <label htmlFor='frequency'>FREQUENCY</label>
                    <Knob config={knobConfig.oscillatorBank.frequency[0]} />
                </div>
            </div>
        </div>
    );
}

export default OscillatorBank;