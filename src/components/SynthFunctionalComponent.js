import React, { useReducer } from 'react';
import { reducer } from '../functions/reducer';
import { createOscillatorBank } from '../functions/createOscillatorBank';
import Controllers from './ControllersFunctionalComponent';
import Keyboard from './KeyboardFunctionalComponent';

export const ctx = new (window.AudioContext || window.webkitAudioContext)();
export const masterGain = ctx.createGain();
export const oscillatorBank = createOscillatorBank(3, ctx);

oscillatorBank[0].gain.connect(masterGain);
oscillatorBank[1].gain.connect(masterGain);
oscillatorBank[2].gain.connect(masterGain);

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