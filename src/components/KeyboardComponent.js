import React from 'react';

const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const twoOctaves = notes.concat(notes);

const Keys = ({ updateSynthNoteAndOctave }) => {
    return(
        twoOctaves.map((note, index) => {
            let octave;

            if(index < 12) {
                octave = 0;
            }
            if(index > 11 && index < 24) {
                octave = 1;
            }

            const noteName = note;
            const isFlat = noteName.length === 1 ? false : true;
            const keyColor = isFlat ? 'key__black' : 'key__white';

            return(
                <div
                    key={noteName + octave}
                    className={`key ${keyColor}`}
                    data-note={noteName}
                    data-octave={octave}
                    onMouseEnter={updateSynthNoteAndOctave}
                >
                    {noteName + octave}
                </div>
            );
        })
    );
};

const Keyboard = props => {
    return(
        <div 
            className='row keys'
            onMouseEnter={props.updateSynthIsPlaying}
            onMouseLeave={props.updateSynthIsPlaying}
        >
            <Keys octave={4} updateSynthNoteAndOctave={props.updateSynthNoteAndOctave} />
        </div>
    );
};

export default Keyboard;