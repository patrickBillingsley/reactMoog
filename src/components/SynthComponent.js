import React, { Component } from 'react';
import Controllers from './ControllersComponent';
import OscillatorBank from './OscillatorBankComponent';
import Mixer from './MixerComponent';
import Filter from './FilterComponent';
import LoudnessContour from './LoudnessContourComponent';
import Output from './OutputComponent';
import Keyboard from './KeyboardComponent';
import Oscillator from './OscillatorComponent';

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
                volume: 0.2
            }
        };

        this.state.gain = this.state.context.createGain();

        this.handleKnobChange = this.handleKnobChange.bind(this);
        this.handleRotarySelectorChange = this.handleRotarySelectorChange.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
        this.handleNoteAndOctaveChange = this.handleNoteAndOctaveChange.bind(this);
        this.handleIsPlayingChange = this.handleIsPlayingChange.bind(this);
        this.handleKeyboardChange = this.handleKeyboardChange.bind(this);
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

    handleKnobChange(value, section, parameter) {
        const maxDistance = 200;
        const distance = Math.abs(value - this.state[section][parameter]);

        if(distance > maxDistance) {
            return;
        } else {
            return this.setState({ [section]: { ...this.state[section], [parameter]: value }});
        }
    }

    handleRotarySelectorChange(value, section, parameter) {
        const roundValue = Math.floor(value);

        return this.setState({ ...this.state, [section]: { [parameter]: roundValue }});
    }

    handleSwitchChange(value, section, parameter) {
        return this.setState({ ...this.state, [section]: { [parameter]: value }});
    }

    handleNoteAndOctaveChange(note, octave) {
        return this.setState({ note, octave });
    }

    handleIsPlayingChange(bool) {
        return this.setState({ isPlaying: bool });
    }

    handleKeyboardChange(value) {
        if(Array.isArray(value)) {
            const note = value[0];
            const octave = value[1];

            console.log(note);
            console.log(octave);

            this.setState({ ...this.state, note: note, octave: octave });
        }
        this.setState({ ...this.state, isPlaying: value });
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
                    detune={this.state.controllers.tune}
                    waveform={this.state.oscillatorBank.waveformOne}
                    vol={this.state.mixer.volumeOne}
                    isPlaying={this.state.mixer.volumeOneSwitch}
                    masterVol={this.state.gain}
                />
                <Oscillator 
                    id='oscTwo'
                    context={this.state.context}
                    note={this.state.note}
                    octave={this.state.octave}
                    range={this.state.oscillatorBank.rangeTwo}
                    detune={this.state.oscillatorBank.frequencyTwo}
                    waveform={this.state.oscillatorBank.waveformTwo}
                    vol={this.state.mixer.volumeTwo}
                    isPlaying={this.state.mixer.volumeTwoSwitch}
                    masterVol={this.state.gain}
                />
                <Oscillator 
                    id='oscThree'
                    context={this.state.context}
                    note={this.state.note}
                    octave={this.state.octave}
                    range={this.state.oscillatorBank.rangeThree}
                    detune={this.state.oscillatorBank.frequencyThree}
                    waveform={this.state.oscillatorBank.waveformThree}
                    vol={this.state.mixer.volumeThree}
                    isPlaying={this.state.mixer.volumeThreeSwitch}
                    masterVol={this.state.gain}
                />
                <div className='container-fluid'>
                    <div className='row control-face align-items-stretch'>
                        <Controllers 
                            controllers={this.state.controllers}
                            handleKnobChange={this.handleKnobChange}
                            handleSwitchChange={this.handleSwitchChange}
                        />
                        <OscillatorBank
                            oscillatorBank={this.state.oscillatorBank}
                            handleKnobChange={this.handleKnobChange}
                            handleRotarySelectorChange={this.handleRotarySelectorChange}
                            handleSwitchChange={this.handleSwitchChange}
                        />
                        <Mixer
                            mixer={this.state.mixer}
                            handleKnobChange={this.handleKnobChange}
                            handleSwitchChange={this.handleSwitchChange}
                        />
                        <div className='col-3 modifiers d-flex flex-column py-3 text-center border'>
                            <Filter
                                filter={this.state.filter}
                                handleKnobChange={this.handleKnobChange}
                            />
                            <LoudnessContour
                                loudnessContour={this.state.loudnessContour}
                                handleKnobChange={this.handleKnobChange}
                            />
                            <h3 className='text-center mt-auto'>MODIFIERS</h3>
                        </div>
                        <Output
                            output={this.state.output}
                            handleKnobChange={this.handleKnobChange}
                        />
                    </div>
                    <Keyboard
                        handleNoteAndOctaveChange={this.handleNoteAndOctaveChange}
                        handleIsPlayingChange={this.handleIsPlayingChange}
                        handleKeyboardChange={this.handleKeyboardChange}
                    />
                </div>
            </React.Fragment>
        );
    };
};

export default Synth;