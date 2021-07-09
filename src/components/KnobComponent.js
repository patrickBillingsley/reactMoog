import React from 'react';

function Knob({ label, value, max, onChange, id }) {

    // const handleChange = (e) => {
    //     onChange(e)
    // }

    return(
        <label>{label}
            <input
                className='input-knob'
                type='range'
                max={max}
                step={max/100}
                value={value}
                onChange={onChange}
            />
        </label>
    );
}

export default Knob;