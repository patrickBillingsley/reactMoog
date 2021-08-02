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

            this.state.osc.frequency.linearRampToValueAtTime(newFreq, this.props.context.currentTime);
        }
    }

    handleVolChange(prevProps) {
        const prevVol = prevProps.vol;
        const currentVol = this.props.vol;

        if(currentVol && prevVol !== currentVol) {
            this.state.gain.gain.linearRampToValueAtTime(currentVol, this.props.context.currentTime);
        }
    }

    handleDetuneChange(prevProps) {
        const prevDetune = prevProps.detune;
        const currentDetune = this.props.detune;

        if(prevDetune && prevDetune !== currentDetune) {
            this.state.osc.detune.setValueAtTime(currentDetune, this.props.context.currentTime);
        }
    }

    render() {
        return null;
    }
}

export default Oscillator;