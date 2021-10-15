import * as context from '../components/SynthFunctionalComponent';
import { ACTIONS } from '../shared/actions';
import { FREQUENCIES } from '../shared/frequencies';

export function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.TUNE:
            context.oscillatorBank[0].osc.detune.setValueAtTime(action.payload.value, context.ctx.currentTime);
            return { ...state, tune: action.payload.value};
        case ACTIONS.CHANGE_NOTE:
            let {octave, note} = action.payload;
            context.masterGain.gain.linearRampToValueAtTime(state.masterVol, context.ctx.currentTime);
            context.oscillatorBank.forEach(osc => {
                osc.osc.frequency.linearRampToValueAtTime(FREQUENCIES[octave + 3][note], context.ctx.currentTime);
            })
            return { ...state, note: action.payload.note, octave: action.payload.octave }
        case ACTIONS.STOP:
            context.masterGain.gain.linearRampToValueAtTime(0, context.ctx.currentTime);
            return { ...state, isPlaying: false }
        default:
            return state;
    }
}