import React from 'react';

const WhiteKeys = ({ octave, updateSynthNoteAndOctave }) => {
    let notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    
    return(
        notes.map(note => {
            const noteName = note;
    
            return(
                <div key={noteName + octave}
                    className='col key'
                    data-note={noteName}
                    data-octave={octave}
                    onMouseEnter={updateSynthNoteAndOctave}
                    >
                    {noteName + octave}
                </div>
            )
        })
    )
};

const Keyboard = props => {
    return(
        <div 
            className='row white-keys'
            onMouseEnter={props.updateSynthIsPlaying}
            onMouseLeave={props.updateSynthIsPlaying}
        >
            <WhiteKeys octave={4} updateSynthNoteAndOctave={props.updateSynthNoteAndOctave} />
            <WhiteKeys octave={5} updateSynthNoteAndOctave={props.updateSynthNoteAndOctave} />
        </div>
    );
};

export default Keyboard;