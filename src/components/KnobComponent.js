import React from 'react';

function Knob({ label, value, max, onChange, name, id, param, min=0 }) {

    return(
        <label>{label}
            <input
                id={id}
                param={param}
                className={name}
                type='range'
                min={min}
                max={max}
                step={max/100}
                value={value}
                onChange={onChange}
            />
        </label>
    );
}

export default Knob;