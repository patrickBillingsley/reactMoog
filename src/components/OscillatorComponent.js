import { Component } from 'react';
import { FREQUENCIES } from '../shared/frequencies';

class Oscillator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            frequencies: FREQUENCIES,
            osc: this.props.context.createOscillator(),
            gain: this.props.context.createGain()
        };

        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleNoteOnAndOff = this.handleNoteOnAndOff.bind(this);
    }
    
    componentDidMount() {
        this.state.osc.connect(this.state.gain);
        this.state.gain.connect(this.props.context.destination);

        this.state.gain.gain.setValueAtTime(this.props.vol, this.props.context.currentTime);
        this.state.osc.start()

        this.props.updateGainArray();
    }
    
    componentDidUpdate(prevProps) {
        this.handleNoteChange(prevProps);
        this.handleNoteOnAndOff(prevProps);

        console.log(this.props.masterVolume.current);
    }

    handleNoteChange(prevProps) {
        const prevNote = prevProps.note;
        const currentNote = this.props.note;
        const prevOctave = prevProps.octave;
        const currentOctave = this.props.octave;

        if(prevNote + prevOctave !== currentNote + currentOctave) {
            const newFreq = this.state.frequencies[currentOctave][currentNote];

            this.state.osc.frequency.setValueAtTime(newFreq, this.props.context.currentTime);
        }
    }

    handleVolChange(prevProps) {
        const prevVol = prevProps.vol;
        const currentVol = this.props.vol;

        if(prevVol !== currentVol) {
            this.state.gain.gain.setValueAtTime(currentVol);
        }
    }

    handleNoteOnAndOff(prevProps) {
        const prevIsPlaying = prevProps.isPlaying;
        const currentIsPlaying = this.props.isPlaying;

        if(prevIsPlaying !== currentIsPlaying) {
            if(currentIsPlaying) {
                this.state.gain.gain.setValueAtTime(this.props.vol, this.props.context.currentTime);
            } else {
                this.state.gain.gain.setValueAtTime(0, this.props.context.currentTime);
            }
        }
    }

    render() {
        return null;
    }
}

export default Oscillator;