import React, { useReducer } from 'react';
import { createOscillator } from '../functions/createOscillator';
import Keyboard from './KeyboardFunctionalComponent';
import Controllers from './ControllersFunctionalComponent';
import { reducer } from '../functions/reducer';

export const ctx = new (window.AudioContext || window.webkitAudioContext)();
export const masterGain = ctx.createGain();
export let [osc1, gain1] = createOscillator(ctx, masterGain);

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