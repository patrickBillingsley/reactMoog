import React, { Component } from 'react';
import Keyboard from './KeyboardComponent';
import Oscillator from './OscillatorComponent';
import MasterVolume from './MasterVolumeComponent';

class Synth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            context: new (window.AudioContext || window.webkitAudioContext)(),
            gain: null,
            note: '',
            freq: 440,
            octave: 4,
            vol: 0.5,
            isPlaying: false
        };

        this.state.gain = this.state.context.createGain();

        this.updateSynthNoteAndOctave = this.updateSynthNoteAndOctave.bind(this);
        this.updateSynthIsPlaying = this.updateSynthIsPlaying.bind(this);
        this.updateSynthVol = this.updateSynthVol.bind(this);
    }

    componentDidMount() {
        this.state.gain.connect(this.state.context.destination);
        this.state.gain.gain.setValueAtTime(this.state.vol, this.state.context.currentTime);
    }

    componentDidUpdate(prevprops, prevState) {
        if(prevState.isPlaying !== this.state.isPlaying) {
            if(this.state.isPlaying) {
                this.state.gain.gain.setValueAtTime(this.state.vol, this.state.context.currentTime);
            } else {
                this.state.gain.gain.setValueAtTime(0, this.state.context.currentTime);
            }
        }
    }

    updateSynthNoteAndOctave(event) {
        const { note, octave } = event.target.dataset;

        this.setState({
            note,
            octave
        });
    }

    updateSynthIsPlaying() {
        this.setState(prevState => ({
            isPlaying: !prevState.isPlaying
        }));
    }

    updateSynthVol(event) {
        const newVol = +event.target.value;

        this.setState({
            vol: newVol
        });
    }

    render() {
        return(
            <React.Fragment>
                <Oscillator 
                    id={1}
                    context={this.state.context}
                    note={this.state.note}
                    octave={this.state.octave}
                    vol={this.state.vol}
                    isPlaying={this.state.isPlaying}
                    masterVol={this.state.gain}
                />
                {/* <Oscillator 
                    id={2}
                    context={this.state.context}
                    note={this.state.note}
                    octave={this.state.octave}
                    vol={this.state.vol}
                    isPlaying={this.state.isPlaying}
                    masterVol={this.state.gain}
                /> */}
                <div className='container'>
                    <div className='row control-face'>
                        <MasterVolume
                            context={this.state.context}
                            updateSynthVol={this.updateSynthVol}
                        />
                    </div>
                    <Keyboard 
                        updateSynthNoteAndOctave={this.updateSynthNoteAndOctave}
                        updateSynthIsPlaying={this.updateSynthIsPlaying}
                    />
                </div>
            </React.Fragment>
        );
    };
};

export default Synth;