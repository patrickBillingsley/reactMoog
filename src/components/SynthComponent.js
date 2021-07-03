import React, { Component } from 'react';
import ControlFace from './ControlFaceComponent';
import Keyboard from './KeyboardComponent';
import Oscillator from './OscillatorComponent';
import MasterVolume from './MasterVolumeComponent';

class Synth extends Component {
    constructor(props) {
        super(props);

        this.masterVolume = React.createRef();

        this.state = {
            context: new (window.AudioContext || window.webkitAudioContext)(),
            note: '',
            freq: 440,
            octave: 4,
            vol: 0.5,
            isPlaying: false
        };

        this.updateSynthNoteAndOctave = this.updateSynthNoteAndOctave.bind(this);
        this.updateSynthIsPlaying = this.updateSynthIsPlaying.bind(this);
        this.updateSynthVol = this.updateSynthVol.bind(this);
    }

    updateSynthNoteAndOctave(event) {
        const data = event.target.dataset;

        const newNote = data.note;
        const newOctave = data.octave;

        this.setState({
            note: newNote,
            octave: newOctave
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

    updateGainArray() {
        console.log(this.oscOne);
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
                    updateGainArray={this.updateGainArray}
                    masterVolume={this.masterVolume}
                />
                {/* <Oscillator 
                    id={2}
                    context={this.state.context}
                    note={this.state.note}
                    octave={this.state.octave}
                    vol={this.state.vol}
                    isPlaying={this.state.isPlaying}
                /> */}
                <MasterVolume
                    context={this.state.context}
                    ref={this.masterVolume}
                />
                <div className='container'>
                    <ControlFace 
                        vol={this.state.vol}
                        updateSynthVol={this.updateSynthVol}
                    />
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