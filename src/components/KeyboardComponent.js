import React from 'react';

const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function generateOctaves(n) {
    if(n === 1) {
        return notes;
    }
    return notes.concat(generateOctaves(n-1));
}

const Keys = ({ handleNoteAndOctaveChange }) => {
    return(
        generateOctaves(3).map((note, index) => {
            let octave = 0;

            if(index > 11 && index < 24) {
                octave = 1;
            }
            if(index > 23 && index < 48) {
                octave = 2;
            }

            const noteName = note;
            const isFlat = noteName.length === 1 ? false : true;
            const keyColor = isFlat ? 'key__black' : 'key__white';

            return(
                <div
                    key={noteName + octave}
                    className={`key ${keyColor} border border-top-0 border-secondary`}
                    data-note={noteName}
                    data-octave={octave}
                    onMouseEnter={() => handleNoteAndOctaveChange(noteName, octave)}
                />
            );
        })
    );
};

const Keyboard = ({ handleIsPlayingChange, handleNoteAndOctaveChange }) => {
    return(
        <div 
            className='row keys border-top'
            onMouseEnter={() => handleIsPlayingChange(true)}
            onMouseLeave={() => handleIsPlayingChange(false)}
        >
            <Keys handleNoteAndOctaveChange={handleNoteAndOctaveChange} />
        </div>
    );
};

export default Keyboard;