import React from 'react';

function Knob(props) {
    return(
        <div className='row control-face'>
            <input 
                type='range'
                max='1'
                step='0.01'
                value={props.vol}
                onChange={props.updateSynthVol}
            />
        </div>
    );
}

export default Knob;