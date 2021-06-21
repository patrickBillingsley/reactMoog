import { Component } from 'react';
import { FREQUENCIES } from '../shared/frequencies';

class Oscillator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            frequencies: FREQUENCIES
        };

        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleNoteOnAndOff = this.handleNoteOnAndOff.bind(this);
    }
    
    componentDidMount() {
        this.osc = this.props.context.createOscillator();
        this.gain = this.props.context.createGain();

        this.osc.connect(this.gain);
        this.gain.connect(this.props.context.destination);

        this.gain.gain.setValueAtTime(this.props.vol, this.props.context.currentTime);
        this.osc.start()
    }

    componentDidUpdate(prevProps) {
        this.handleNoteChange(prevProps);
        this.handleNoteOnAndOff(prevProps);
    }

    handleNoteChange(prevProps) {
        const prevNote = prevProps.note;
        const currentNote = this.props.note;
        const prevOctave = prevProps.octave;
        const currentOctave = this.props.octave;

        if(prevNote + prevOctave !== currentNote + currentOctave) {
            const newFreq = this.state.frequencies[currentOctave][currentNote];

            this.osc.frequency.setValueAtTime(newFreq, this.props.context.currentTime);
        }
    }

    handleVolChange(prevProps) {
        const prevVol = prevProps.vol;
        const currentVol = this.props.vol;

        if(prevVol !== currentVol) {
            this.gain.gain.setValueAtTime(currentVol);
        }
    }

    handleNoteOnAndOff(prevProps) {
        const prevIsPlaying = prevProps.isPlaying;
        const currentIsPlaying = this.props.isPlaying;

        if(prevIsPlaying !== currentIsPlaying) {
            if(currentIsPlaying) {
                this.gain.gain.setValueAtTime(this.props.vol, this.props.context.currentTime);
            } else {
                this.gain.gain.setValueAtTime(0, this.props.context.currentTime);
            }
        }
    }

    render() {
        return null;
    }
}

export default Oscillator;