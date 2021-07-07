import React from 'react';

function Knob(props) {
    const { label, value, max, onChange } = props;

    return(
        <label>{label}
            <input
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