import * as context from '../components/SynthFunctionalComponent';
import { ACTIONS } from '../shared/actions';
import { FREQUENCIES } from '../shared/frequencies';

export function reducer(state, action) {
    const now = context.ctx.currentTime;

    switch(action.type) {
        case ACTIONS.TUNE:
            context.oscillatorBank[0].osc.detune.setValueAtTime(action.payload.value, now);
            return { ...state, tune: action.payload.value};
        case ACTIONS.CHANGE_NOTE:
            if(state.heldKeys[0] > -1) {
                changeNote(state.heldKeys[0]);
                return { ...state, note: state.heldKeys[0] };
            }
            changeNote(action.payload);
            return { ...state, note: action.payload };
        case ACTIONS.PLAY:
            play(state.masterVol, now);
            return { ...state, isPlaying: true };
        case ACTIONS.STOP:
            stop(now);
            return { ...state, isPlaying: false };
        case ACTIONS.KEY_DOWN:
            if(state.heldKeys.includes(action.payload)) return state;
            const keyDownArray = state.heldKeys.concat(action.payload).sort(sortHighToLow);
            changeNote(keyDownArray[0]);
            play(state.masterVol, now);
            return { ...state, heldKeys: keyDownArray, isPlaying: true };
        case ACTIONS.KEY_UP:
            const keyUpArray = state.heldKeys.filter(key => key !== action.payload);
            let isPlaying = true;
            if(keyUpArray.length) {
                changeNote(keyUpArray[0]);
            } else {
                stop(now);
                isPlaying = false;
            }
            return { ...state, heldKeys: keyUpArray, isPlaying: isPlaying };
        default:
            return state;
    }
}

function getFrequency(index) {
    const octave = Math.floor(index / 12);
    const note = index % 12;
    const frequency = Object.values(FREQUENCIES[octave + 3])[note];

    return frequency;
}

function changeNote(index) {
    const freq = getFrequency(index);
    context.oscillatorBank.forEach(osc => {
        osc.osc.frequency.linearRampToValueAtTime(freq, context.ctx.currentTime);
    })
}

function play(vol, time) {
    context.masterGain.gain.linearRampToValueAtTime(vol, time);
}

function stop(time) {
    context.masterGain.gain.linearRampToValueAtTime(0, time);
}

function sortHighToLow(a, b) {
    return a > b ? -1 :
           a < b ?  1 :
                    0
}