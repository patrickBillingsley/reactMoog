import React from 'react';
import Knob from './KnobFunctionalComponent';

const knobConfig = {
    tune: {
        id: 'controllers__tune',
        input: null,
        min: -500,
        max: 500,
        step: null,
        rotateDegrees: null,
        clampMin: null,
        clampMax: null,
        skin: null,
        handleChange: value => console.log(value)
    }
};

const Controllers = () => {
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