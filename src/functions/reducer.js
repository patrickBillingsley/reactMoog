import { osc1, masterGain, ACTIONS, ctx } from '../components/SynthFunctionalComponent';
import { FREQUENCIES } from '../shared/frequencies';

export function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.TUNE:
            osc1.detune.setValueAtTime(action.payload.value, ctx.currentTime);
            return { ...state, tune: action.payload.value};
        case ACTIONS.CHANGE_NOTE:
            let {octave, note} = action.payload;
            masterGain.gain.linearRampToValueAtTime(state.masterVol, ctx.currentTime);
            osc1.frequency.linearRampToValueAtTime(FREQUENCIES[octave + 3][note], ctx.currentTime);
            return { ...state, note: action.payload.note, octave: action.payload.octave }
        case ACTIONS.STOP:
            masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime);
            return { ...state, isPlaying: false }
        default:
            return state;
    }
}