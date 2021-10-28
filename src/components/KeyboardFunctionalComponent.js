import React, { useContext } from 'react';
import { SynthCtx } from './SynthFunctionalComponent';

const Keys = () => {
    const ctx = useContext(SynthCtx);
    let octave = -1;

    return(
        generateOctaves(3).map((note, index) => {
            if(index % 12 === 0) octave++;

            const keyColor = note[1] ? 'black' : 'white';

            return(
                <div
                    key={index}
                    className={`key key__${keyColor} border border-top-0 border-secondary`}
                    data-note={note}
                    data-octave={octave}
                    onMouseEnter={() => {
                        ctx.dispatch({ type: 'change note', payload: index })
                        ctx.dispatch({ type: 'play' })
                    }}
                    onMouseLeave={() => ctx.dispatch({ type: 'stop' })}
                />
            );
        })
    );
}

const Keyboard = () => {
    return(
        <div className='row keys border-top'>
            <Keys />
        </div>
    );
};

function generateOctaves(n) {
    const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

    if(n === 1) {
        return notes;
    }
    return notes.concat(generateOctaves(n-1));
}

export default Keyboard;