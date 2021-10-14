import React, { useReducer } from 'react';
import { createOscillator } from '../functions/createOscillator';
import Keyboard from './KeyboardFunctionalComponent';
import Controllers from './ControllersFunctionalComponent';
import { FREQUENCIES } from '../shared/frequencies';

const ctx = new (window.AudioContext || window.webkitAudioContext)();
const masterGain = ctx.createGain();
let [osc1, gain1] = createOscillator(ctx, masterGain);

masterGain.gain.setValueAtTime(0, ctx.currentTime);
masterGain.connect(ctx.destination);

export const SynthCtx = React.createContext();

const initialState = {
    tune: 0,
    note: 'A',
    octave: 4,
    masterVol: 0.5,
    isPlaying: false
};

export const ACTIONS = {
    TUNE: 'tune',
    CHANGE_NOTE: 'change note',
    STOP: 'stop'
};

function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.TUNE:
            osc1.detune.setValueAtTime(action.payload.value, ctx.currentTime);
            return { ...state, tune: action.payload.value};
        case ACTIONS.CHANGE_NOTE:
            console.log('note:', action.payload.note);
            let {octave, note} = action.payload;
            masterGain.gain.linearRampToValueAtTime(state.masterVol, ctx.currentTime);
            osc1.frequency.linearRampToValueAtTime(FREQUENCIES[octave + 2][note], ctx.currentTime);
            return { ...state, note: action.payload.note, octave: action.payload.octave }
        case ACTIONS.STOP:
            masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime);
            return { ...state, isPlaying: false }
        default:
            return state;
    }
}

const Synth = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <div className='container-fluid'>
            <div className='row control-face align-items-stretch'>
                <SynthCtx.Provider value={{ state: state, dispatch: dispatch, ctx: ctx }}>
                    <Controllers />
                    <Keyboard />
                </SynthCtx.Provider>
            </div>
        </div>
    );
};

export default Synth;