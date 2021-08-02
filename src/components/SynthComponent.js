import React, { Component } from 'react';
import Keyboard from './KeyboardComponent';
import Oscillator from './OscillatorComponent';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';

class Synth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            context: new (window.AudioContext || window.webkitAudioContext)(),
            gain: null,
            master: {
                vol: 0,
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
        this.handleOnChange = this.handleOnChange.bind(this);
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

    handleOnChange(value, section, parameter) {
        const maxDistance = 200;
        let distance = Math.abs(value - this.state[section][parameter]);
        if(distance > maxDistance) {
            return;
        } else {
            this.setState({ [section]: { ...this.state[section], [parameter]: value}})
        }
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
                        <div className='col knob'>
                            <Knob
                                id='master'
                                value={this.state.master.vol}
                                min={0}
                                max={1}
                                step={0.01}
                                preciseMode={false}
                                onChange={value => this.handleOnChange(value, 'master', 'vol')}
                                rotateDegrees={180}
                                clampMin={30}
                                clampMax={330}
                                skin={skins.s16}
                            />
                            <label htmlFor='master'>Master</label>
                        </div>
                        <div className='col knob'>
                            <Knob
                                id='oscOneVol'
                                value={this.state.oscOne.vol}
                                min={0}
                                max={1}
                                step={0.01}
                                preciseMode={false}
                                onChange={value => this.handleOnChange(value, 'oscOne', 'vol')}
                                rotateDegrees={180}
                                clampMin={30}
                                clampMax={330}
                                skin={skins.s16}
                            />
                            <label htmlFor='oscOneVol'>Osc 1 Vol</label>
                        </div>
                        <div className='col knob'>
                            <Knob
                                id='oscOneDetune'
                                value={this.state.oscOne.detune}
                                min={-1200}
                                max={1200}
                                step={1}
                                preciseMode={false}
                                onChange={value => this.handleOnChange(value, 'oscOne', 'detune')}
                                rotateDegrees={180}
                                clampMin={30}
                                clampMax={330}
                                skin={skins.s16}
                            />
                            <label htmlFor='oscOneDetune'>Osc 1 Detune</label>
                        </div>
                        <div className='col knob'>
                            <Knob
                                id='oscTwoVol'
                                value={this.state.oscTwo.vol}
                                min={0}
                                max={1}
                                step={0.01}
                                preciseMode={false}
                                onChange={value => this.handleOnChange(value, 'oscTwo', 'vol')}
                                rotateDegrees={180}
                                clampMin={30}
                                clampMax={330}
                                skin={skins.s16}
                            />
                            <label htmlFor='oscTwoVol'>Osc 2 Vol</label>
                        </div>
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