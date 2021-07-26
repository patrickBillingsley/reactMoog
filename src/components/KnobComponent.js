import React from 'react';

function Knob({ label, value, max, onChange, name, id, param }) {

    return(
        <label>{label}
            <input
                id={id}
                param={param}
                className={name}
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