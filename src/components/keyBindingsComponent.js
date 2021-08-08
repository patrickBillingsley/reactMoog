import React from 'react';

function keyBindings(code) {
    let note;
    let octave;
    let value;

    switch(code) {
        case 'KeyA':
            note = 'C';
            octave = 0;
            value = 0;
            break;
        case 'KeyW':
            note = 'Db';
            octave = 0;
            value = 1;
            break;
        case 'KeyS':
            note = 'D';
            octave = 0;
            value = 2;
            break;
        case 'KeyE':
            note = 'Eb';
            octave = 0;
            value = 3;
            break;
        case 'KeyD':
            note = 'E';
            octave = 0;
            value = 4;
            break;
        case 'KeyF':
            note = 'F';
            octave = 0;
            value = 5;
            break;
        case 'KeyT':
            note = 'Gb';
            octave = 0;
            value = 6;
            break;
        case 'KeyG':
            note = 'G';
            octave = 0;
            value = 7;
            break;
        case 'KeyY':
            note = 'Ab';
            octave = 0;
            value = 8;
            break;
        case 'KeyH':
            note = 'A';
            octave = 0;
            value = 9;
            break;
        case 'KeyU':
            note = 'Bb';
            octave = 0;
            value = 10;
            break;
        case 'KeyJ':
            note = 'B';
            octave = 0;
            value = 11;
            break;
        case 'KeyK':
            note = 'C';
            octave = 1;
            value = 12;
            break;
        case 'KeyO':
            note = 'Db';
            octave = 1;
            value = 13;
            break;
        case 'KeyL':
            note = 'D';
            octave = 1;
            value = 14;
            break;
        case 'KeyP':
            note = 'Eb';
            octave = 1;
            value = 15;
            break;
        case 'Semicolon':
            note = 'E';
            octave = 1;
            value = 16;
            break;
        default:
            return;
    }
    return { note, octave, value };
}

export default keyBindings;