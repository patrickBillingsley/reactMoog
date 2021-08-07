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
    }

    handleNoteChange(prevProps) {
        const prevNote = prevProps.note + prevProps.octave;
        const currentNote = this.props.note + this.props.octave;

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
        const prevDetune = prevProps.detune;
        const currentDetune = this.props.detune;

        if(currentDetune && prevDetune !== currentDetune) {
            this.state.osc.detune.setValueAtTime(currentDetune, this.props.context.currentTime);
        }
    }

    render() {
        return null;
    }
}

export default Oscillator;