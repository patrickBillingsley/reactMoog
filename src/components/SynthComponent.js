import React, { Component } from 'react';
import Keyboard from './KeyboardComponent';
import Oscillator from './OscillatorComponent';
import Knob from './KnobComponent';

class Synth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            context: new (window.AudioContext || window.webkitAudioContext)(),
            gain: null,
            vol: 0.5,
            oscOne: {
                vol: 0.5,
                range: 4
            },
            oscTwo: {
                vol: 0.5,
                range: 5
            },
            note: '',
            freq: 440,
            octave: 0,
            isPlaying: false
        };

        this.state.gain = this.state.context.createGain();

        this.updateSynthNoteAndOctave = this.updateSynthNoteAndOctave.bind(this);
        this.updateSynthIsPlaying = this.updateSynthIsPlaying.bind(this);
        this.updateSynthVol = this.updateSynthVol.bind(this);
        this.handleOscOneVolChange = this.handleOscOneVolChange.bind(this);
        this.handleOscTwoVolChange = this.handleOscTwoVolChange.bind(this);
        // this.handleOscVolChange = this.handleOscVolChange.bind(this);
    }

    componentDidMount() {
        this.state.gain.connect(this.state.context.destination);
        this.state.gain.gain.setValueAtTime(0, this.state.context.currentTime);
    }

    componentDidUpdate(prevprops, prevState) {
        if(prevState !== this.state) {
            console.log(this.state);
        }

        if(prevState.isPlaying !== this.state.isPlaying) {
            if(this.state.isPlaying) {
                this.state.gain.gain.setValueAtTime(this.state.vol, this.state.context.currentTime);
            } else {
                this.state.gain.gain.setValueAtTime(0, this.state.context.currentTime);
            }
        }

        if(prevState.octave !== this.state.octave) {
            const newOctave = +this.state.octave
            this.setState({ octave: newOctave });
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

        this.setState({ vol: newVol });
    }

    // handleOscVolChange(event, id) {
    //     const newVol = +event.target.value;

    //     this.setState(() => ({ [id]: { vol: newVol } }));
    // }

    handleOscOneVolChange(event) {
        console.log('hi');

        const newVol = +event.target.value;

        this.setState({ oscOne: { vol: newVol } });
    }

    handleOscTwoVolChange(event) {
        const newVol = +event.target.value;

        this.setState({ oscTwo: { vol: newVol } });
    }

    render() {
        return(
            <React.Fragment>
                <Oscillator
                    id='oscOne'
                    context={this.state.context}
                    note={this.state.note}
                    octave={this.state.octave}
                    range={this.state.oscOne.range}
                    vol={this.state.oscOne.vol}
                    masterVol={this.state.gain}
                />
                <Oscillator 
                    id='oscTwo'
                    context={this.state.context}
                    note={this.state.note}
                    octave={this.state.octave}
                    range={this.state.oscTwo.range}
                    vol={this.state.oscTwo.vol}
                    masterVol={this.state.gain}
                />
                <div className='container'>
                    <div className='row control-face'>
                        <Knob
                            label='Master'
                            value={this.state.vol}
                            max={1}
                            onChange={this.updateSynthVol}
                        />
                        <Knob
                            label='Osc 1 Vol'
                            id='oscOneVol'
                            value={this.state.oscOne.vol}
                            max={1}
                            onChange={this.handleOscOneVolChange}
                        />
                        <Knob
                            label='Osc 2 Vol'
                            id='oscTwoVol'
                            value={this.state.oscTwo.vol}
                            max={1}
                            onChange={this.handleOscTwoVolChange}
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