import { Component } from 'react';
import { FREQUENCIES } from '../shared/frequencies';

class Oscillator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            osc: this.props.context.createOscillator(),
            gain: this.props.context.createGain(),
            frequencies: FREQUENCIES
        };

        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleVolChange = this.handleVolChange.bind(this);
        this.handleDetuneChange = this.handleDetuneChange.bind(this);
        this.handleWaveformChange = this.handleWaveformChange.bind(this);
    }

    componentDidMount() {
        this.state.osc.connect(this.state.gain);
        this.state.gain.gain.setValueAtTime(this.props.vol, this.props.context.currentTime);
        this.state.osc.start();

        this.state.gain.connect(this.props.masterVol);
    }
    
    componentDidUpdate(prevProps) {
        this.handleNoteChange(prevProps);
        this.handleVolChange(prevProps);
        this.handleDetuneChange(prevProps);
        this.handleWaveformChange(prevProps);
    }

    handleNoteChange(prevProps) {
        const prevNote = prevProps.note + prevProps.octave;
        const currentNote = this.props.note + (this.props.octave + this.props.range);

        if(prevNote !== currentNote) {
            const octave = (+this.props.octave + this.props.range);
            const newFreq = this.state.frequencies[octave][this.props.note];

            if(newFreq) {
                this.state.osc.frequency.linearRampToValueAtTime(newFreq, this.props.context.currentTime);
            }
        }
    }

    handleVolChange() {
        const value = this.props.isPlaying ? this.props.vol : 0;

        if(this.state.gain.gain.value !== value) {
            this.state.gain.gain.linearRampToValueAtTime(value, this.props.context.currentTime);
        }
    }

    handleDetuneChange(prevProps) {
        const prevDetune = prevProps.detune ? prevProps.detune + prevProps.tune : prevProps.tune;
        const currentDetune = this.props.detune ? this.props.detune + this.props.tune : this.props.tune;

        if(currentDetune && prevDetune !== currentDetune) {
            this.state.osc.detune.setValueAtTime(currentDetune, this.props.context.currentTime);
        }
    }

    handleWaveformChange(prevProps) {
        const prevWaveform = prevProps.waveform;
        const currentWaveform = this.props.waveform;

        if(prevWaveform !== currentWaveform) {
            let type;
            switch(currentWaveform) {
                case 0:
                    type = 'triangle';
                    break;
                case 1:
                    type = 'sawtooth';
                    break;
                case 2:
                    type = 'sawtooth';
                    break;
                case 3:
                    type = 'square';
                    break;
                case 4:
                    type = 'sine';
                    break;
                case 5:
                    type = 'square';
                    break;
                default:
                    return;
            };

            this.state.osc.type = type;
        }
    }

    render() {
        return null;
    }
}

export default Oscillator;