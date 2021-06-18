import React from 'react';

const fundamentalOctave = {
    C:  261.63,
    Db: 277.18,
    D:  293.66,
    Eb: 311.13,
    E:  329.63,
    F:  349.23,
    Gb: 369.99,
    G:  392.00,
    Ab: 415.30,
    A:  440.00,
    Bb: 466.16,
    B:  493.88
};

const WhiteKeys = ({ updateSynthState }) => {
    return(
        Object.entries(fundamentalOctave).map(noteAndFreqArr => {
            const note = noteAndFreqArr[0];
            const freq = noteAndFreqArr[1];
            if(note.length === 1) {
                return(
                    <div key={note + freq}
                        className='col key'
                        data-note={note}
                        data-freq={freq}
                        onMouseEnter={updateSynthState}
                    >
                        {note}
                    </div>
                );
            };

            return null;
        })
    )
};

// const BlackKeys = () => {
//     return(
//         Object.entries(fundamentalOctave).map(arr => {
//             if(arr[0].length === 1) {
//                 return(
//                     <div className='col' />
//                 );
//             };

//             return(
//                 <div className='col key flat'>{arr[0]}</div>
//             );
//         })
//     );
// };

const Keyboard = props => {
    return(
        <div className='container'>

            <div className='row white-keys'>
                <WhiteKeys 
                    updateSynthState={props.updateSynthState}
                />
            </div>

            {/* <div className='row black-keys'>
                <BlackKeys />
            </div> */}

        </div>
    );
};

export default Keyboard;