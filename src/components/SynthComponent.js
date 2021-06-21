import React, { Component } from 'react';
import ControlFace from './ControlFaceComponent';
import Keyboard from './KeyboardComponent';
import Oscillator from './OscillatorComponent';

class Synth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            context: new (window.AudioContext || window.webkitAudioContext)(),
            note: '',
            freq: 440,
            octave: 1,
            vol: 0.5,
            isPlaying: false
        };

        this.updateSynthNoteAndOctave = this.updateSynthNoteAndOctave.bind(this);
        this.updateSynthIsPlaying = this.updateSynthIsPlaying.bind(this);
        this.updateSynthVol = this.updateSynthVol.bind(this);
    }

    updateSynthNoteAndOctave(event) {
        const data = event.target.dataset;

        const note = data.note;
        const octave = data.octave;

        this.setState({
            note: note,
            octave: octave
        });
    }

    updateSynthIsPlaying() {
        this.setState({
            isPlaying: !this.state.isPlaying
        });
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
                    context={this.state.context}
                    note={this.state.note}
                    octave={this.state.octave}
                    vol={this.state.vol}
                    isPlaying={this.state.isPlaying}
                />
                <div className='container '>
                    <ControlFace updateSynthVol={this.updateSynthVol} />
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