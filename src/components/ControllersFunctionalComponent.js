import React from 'react';
import Knob from './KnobFunctionalComponent';
import knobConfig from '../shared/KNOB_CONFIG.json';

function Controllers() {
    return(
        <div className='col-2 controllers d-flex flex-column pt-5 pb-3 border'>
            <div className='row m-2'>
                <div className='col-12 knob'>
                    <label htmlFor='controllers__tune'>TUNE</label>
                    <Knob config={knobConfig.tune} />
                </div>
            </div>
        </div>
    );
};

export default Controllers;