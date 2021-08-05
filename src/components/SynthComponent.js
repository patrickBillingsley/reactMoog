import React, { Component } from 'react';
import Controllers from './ControllersComponent';
import OscillatorBank from './OscillatorBankComponent';
import Mixer from './MixerComponent';
import Filter from './FilterComponent';
import LoudnessContour from './LoudnessContourComponent';
import Output from './OutputComponent';
import Keyboard from './KeyboardComponent';
import Oscillator from './OscillatorComponent';
import { Knob } from 'react-rotary-knob';
import Switch from 'react-switch';
import * as skins from 'react-rotary-knob-skin-pack';

class Synth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            context: new (window.AudioContext || window.webkitAudioContext)(),
            gain: null,
            note: '',
            freq: 440,
            octave: 0,
            isPlaying: false,
            controllers: {
                tune: 0,
                glide: 0,
                modulationMix: 0,
                oscillatorThreeSwitch: false,
                noiseSwitch: false
            },
            oscillatorBank: {
                rangeOne: 4,
                waveformOne: 0,
                rangeTwo: 5,
                frequencyTwo: 0,
                waveformTwo: 0,
                rangeThree: 5,
                frequencyThree: 0,
                waveformThree: 0
            },
            mixer: {
                volumeOne: 0.5,
                volumeOneSwitch: true,
                volumeTwo: 0.5,
                volumeTwoSwitch: false,
                volumeThree: 0.5,
                volumeThreeSwitch: false,
                externalInputVolume: 0,
                externalInputVolumeSwitch: false,
                noiseVolume: 0,
                noiseVolumeSwitch: false,
                filterModulationSwitch: false,
                keyboardControlOne: true,
                keyboardControlTwo: true,
                whitePinkSwitch: false
            },
            filter: {
                cutoffFrequency: 0,
                emphasis: 0,
                amountOfContour: 0,
                attackTime: 0,
                decayTime: 0,
                sustainLevel: 0
            },
            loudnessContour: {
                attackTime: 0,
                decayTime: 0,
                sustainLevel: 0
            },
            output: {
                volume: 0
            }
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
                this.state.gain.gain.linearRampToValueAtTime(this.state.output.volume, this.state.context.currentTime);
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

        console.log('value:', value);
        console.log('section:', section);
        console.log('parameter:', parameter);

        if(typeof(value) === 'boolean') {
            return this.setState({...this.state, [section]: { ...this.state[section], [parameter]: value}});
        }

        const maxDistance = 200;
        const distance = Math.abs(value - this.state[section][parameter]);

        if(distance > maxDistance) {
            return;
        } else {
            return this.setState({...this.state, [section]: { ...this.state[section], [parameter]: value}});
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
                    range={this.state.oscillatorBank.rangeOne}
                    vol={this.state.mixer.volumeOne}
                    detune={this.state.controllers.tune}
                    masterVol={this.state.gain}
                />
                <Oscillator 
                    id='oscTwo'
                    context={this.state.context}
                    note={this.state.note}
                    octave={this.state.octave}
                    range={this.state.oscillatorBank.rangeTwo}
                    vol={this.state.mixer.volumeTwo}
                    detune={this.state.oscillatorBank.frequencyTwo}
                    masterVol={this.state.gain}
                />
                <Oscillator 
                    id='oscThree'
                    context={this.state.context}
                    note={this.state.note}
                    octave={this.state.octave}
                    range={this.state.oscillatorBank.rangeThree}
                    vol={this.state.mixer.volumeThree}
                    detune={this.state.oscillatorBank.frequencyThree}
                    masterVol={this.state.gain}
                />
                <div className='container-fluid'>
                    <div className='row control-face align-items-stretch'>
                        <Controllers controllers={this.state.controllers} handleOnChange={this.handleOnChange} />
                        <OscillatorBank oscillatorBank={this.state.oscillatorBank} handleOnChange={this.handleOnChange} />
                        <Mixer mixer={this.state.mixer} handleOnChange={this.handleOnChange} />
                        <div className='col-3 modifiers d-flex flex-column py-3 text-center border'>
                            <Filter filter={this.state.filter} handleOnChange={this.handleOnChange} />
                            <LoudnessContour loudnessContour={this.state.loudnessContour} handleOnChange={this.handleOnChange} />
                            <h3 className='text-center mt-auto'>MODIFIERS</h3>
                        </div>
                        <Output output={this.state.output} handleOnChange={this.handleOnChange} />
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