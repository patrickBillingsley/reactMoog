import React from 'react';

function Knob(props) {
    const { value, onChange } = props;

    return(
        <input 
            type='range'
            max='1'
            step='0.01'
            value={value}
            onChange={onChange}
        />
    );
}

export default Knob;