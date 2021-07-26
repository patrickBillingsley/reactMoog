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
            master: {
                vol: 0.5,
            },
            oscOne: {
                vol: 0.5,
                range: 4,
                detune: 0
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
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    componentDidMount() {
        this.state.gain.connect(this.state.context.destination);
        this.state.gain.gain.setValueAtTime(0, this.state.context.currentTime);
    }

    componentDidUpdate(prevprops, prevState) {
        if(prevState.isPlaying !== this.state.isPlaying) {
            if(this.state.isPlaying) {
                this.state.gain.gain.linearRampToValueAtTime(this.state.master.vol, this.state.context.currentTime);
            } else {
                this.state.gain.gain.linearRampToValueAtTime(0, this.state.context.currentTime);
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

    handleStateChange(event) {
        const target = event.target.attributes;

        const id = target.id.value;
        const param = target.param.value;
        const newValue = +event.target.value;

        this.setState({ [id]: { ...this.state[id], [param]: newValue } });
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
                    detune={this.state.oscOne.detune}
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
                            id='master'
                            param='vol'
                            value={this.state.master.vol}
                            max={1}
                            onChange={this.handleStateChange}
                            name=''
                        />
                        <Knob
                            label='Osc 1 Vol'
                            id='oscOne'
                            param='vol'
                            value={this.state.oscOne.vol}
                            max={1}
                            onChange={this.handleStateChange}
                            name=''
                        />
                        <Knob
                            label='Osc 1 Detune'
                            id='oscOne'
                            param='detune'
                            value={this.state.oscOne.detune}
                            max={1200}
                            onChange={this.handleStateChange}
                            name=''
                        />
                        <Knob
                            label='Osc 2 Vol'
                            id='oscTwo'
                            param='vol'
                            value={this.state.oscTwo.vol}
                            max={1}
                            onChange={this.handleStateChange}
                            name=''
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