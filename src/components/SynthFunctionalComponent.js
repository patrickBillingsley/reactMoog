import React, { useEffect, useReducer } from 'react';
import { reducer } from '../functions/reducer';
import initialState from '../presets/InitialState.json';
import { createOscillatorBank } from '../functions/createOscillatorBank';
import KEYBINDINGS from '../shared/KEYBINDINGS.json';
import Controllers from './ControllersFunctionalComponent';
import OscillatorBank from './OscillatorBankComponent';
import Mixer from './MixerComponent';
import Keyboard from './KeyboardFunctionalComponent';

export const SynthCtx = React.createContext();
export const ctx = new (window.AudioContext || window.webkitAudioContext)();
export const masterGain = ctx.createGain();
export const oscillatorBank = createOscillatorBank(3, ctx);

init();

const Synth = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        window.addEventListener('keydown', ({ code }) => {
            const index = KEYBINDINGS.indexOf(code);
            if(KEYBINDINGS.includes(code)) {
                dispatch({ type: 'key down', payload: index })
            }
        })
        
        window.addEventListener('keyup', ({ code }) => {
            const index = KEYBINDINGS.indexOf(code);
            if(KEYBINDINGS.includes(code)) {
                dispatch({ type: 'key up', payload: index })
            }
        })
    }, []);

    return(
        <div className='container-fluid'>
            <div className='row control-face align-items-stretch text-center'>
                <SynthCtx.Provider value={{ state, dispatch, ctx }}>
                    <Controllers />
                    <OscillatorBank />
                    <Mixer />
                    <Keyboard />
                </SynthCtx.Provider>
            </div>
        </div>
    );
};

function init() {
    oscillatorBank.forEach(osc => osc.gain.connect(masterGain));
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);
}

export default Synth;