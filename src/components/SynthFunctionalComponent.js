import React, { useReducer } from 'react';
import { reducer } from '../functions/reducer';
import { initialState } from '../presets/initialState';
import { createOscillatorBank } from '../functions/createOscillatorBank';
import { KEYBINDINGS } from '../shared/KEYBINDINGS';
import Controllers from './ControllersFunctionalComponent';
import Keyboard from './KeyboardFunctionalComponent';

export const SynthCtx = React.createContext();
export const ctx = new (window.AudioContext || window.webkitAudioContext)();
export const masterGain = ctx.createGain();
export const oscillatorBank = createOscillatorBank(3, ctx);
const heldKeys = [];

init();

const keybindings = KEYBINDINGS;

window.addEventListener('keydown', e => {
    const index = keybindings.indexOf(e.code);
    if(!keybindings.includes(e.code) || heldKeys.includes(index)) return;
    if(index > -1 && !heldKeys.includes(index)) {
        heldKeys.push(index);
        heldKeys.sort((a, b) => sortHighToLow(a, b));
    }
    console.log(heldKeys);
})

window.addEventListener('keyup', e => {
    const index = keybindings.indexOf(e.code);
    if(heldKeys.includes(index)) {
        heldKeys.splice(heldKeys.indexOf(index), 1);
    }
    console.log(heldKeys);
})

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

function init() {
    oscillatorBank.forEach(osc => osc.gain.connect(masterGain));
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);
}

function sortHighToLow(a, b) {
    return a > b ? -1 :
           a < b ?  1 :
                    0
}

export default Synth;