import * as context from '../components/SynthFunctionalComponent';
import ACTIONS from '../shared/ACTIONS.json';
import FREQUENCIES from '../shared/FREQUENCIES.json';
import WAVEFORMS from '../shared/WAVEFORMS.json';

export function reducer(state, action) {
    const now = context.ctx.currentTime;
    const delay = now + 0.1;

    switch(action.type) {
        case ACTIONS.TUNE:
            return changeTune(action.payload);
        case ACTIONS.RANGE:
            return changeRange(action.payload);
        case ACTIONS.FREQUENCY:
            return changeFrequency(action.payload);
        case ACTIONS.WAVEFORM:
            return changeWaveform(action.payload);
        case ACTIONS.VOLUME:
            return changeVolume(action.payload);
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

    function changeTune({ value }) {
        context.oscillatorBank.forEach((oscillator, index) => {
            const frequencyValue = state.frequency[index] || 0;
            oscillator.osc.detune.linearRampToValueAtTime(frequencyValue + value, delay);
        })
        return { ...state, tune: value };
    }

    function changeRange({ osc, value }) {
        const newRangeState = [ ...state.range ];
        newRangeState[osc] = Math.floor(value);
        return { ...state, range: newRangeState };
    }

    function changeFrequency({ osc, value }) {
        const newFrequencyState =  [ ...state.frequency ];
        newFrequencyState[osc] = value;
        context.oscillatorBank[osc].osc.detune.linearRampToValueAtTime(value + state.tune, delay);
        return { ...state, frequency: newFrequencyState };
    }

    function changeWaveform({ osc, value }) {
        const newWaveformState = [ ...state.waveform ];
        newWaveformState[osc] = Math.floor(value);
        context.oscillatorBank[osc].osc.type = WAVEFORMS[osc][newWaveformState[osc]];
        return { ...state, waveform: newWaveformState };
    }

    function changeVolume({ osc, value }) {
        const newVolumeState = [ ...state.volume ];
        newVolumeState[osc] = value;
        context.oscillatorBank[osc].gain.gain.linearRampToValueAtTime(value, now);
        return { ...state, volume: newVolumeState };
    }

    function changeNote(index) {
        context.oscillatorBank.forEach((osc, i) => {
            const newFreq = getFrequency((state.range[i] * 12) + index);
            osc.osc.frequency.linearRampToValueAtTime(newFreq, now);
        })
    }
}

function getFrequency(index) {
    const octave = Math.floor(index / 12);
    const note = index % 12;
    const frequency = Object.values(FREQUENCIES[octave])[note];

    return frequency;
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