import React, { useReducer } from 'react';
import { createOscillator } from './OscillatorFunctionalComponent';
import Controllers from './ControllersFunctionalComponent';

const ctx = new (window.AudioContext || window.webkitAudioContext)();
const masterGain = ctx.createGain();
let [osc1, gain1] = createOscillator(ctx, masterGain);

masterGain.gain.setValueAtTime(0.5, ctx.currentTime);
masterGain.connect(ctx.destination);

export const SynthCtx = React.createContext();

const initialState = {
    tune: 0
};

export const ACTIONS = {
    TUNE: 'tune'
};

function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.TUNE:
            osc1.detune.setValueAtTime(action.payload.value, ctx.currentTime);
            return { ...state, tune: action.payload.value};
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
                </SynthCtx.Provider>
            </div>
        </div>
    );
};

export default Synth;