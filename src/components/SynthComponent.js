import React, { Component } from 'react';
import Keyboard from './KeyboardComponent';
import Oscillator from './OscillatorComponent';

class Synth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            context: new (window.AudioContext || window.webkitAudioContext)(),
            note: '',
            freq: 440,
            octave: 1
        };

        this.updateSynthState = this.updateSynthState.bind(this);
    }

    updateSynthState(event) {
        const note = event.target.dataset.note;
        const freq = event.target.dataset.freq;

        this.setState({
            note: note,
            freq: freq
        });
    }

    render() {
        return(
            <React.Fragment>
                <Oscillator context={this.state.context} note={this.state.note} freq={this.state.freq} />
                <Keyboard updateSynthState={this.updateSynthState} />
            </React.Fragment>
        );
    };
};

export default Synth;