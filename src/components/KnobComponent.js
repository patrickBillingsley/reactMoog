import React from 'react';

function Knob({ label, value, max, onChange, id }) {

    const handleChange = (e) => {
        onChange(e, id)
    }

    return(
        <label>{label}
            <input
                type='range'
                max={max}
                step={max/100}
                value={value}
                onChange={handleChange}
            />
        </label>
    );
}

export default Knob;