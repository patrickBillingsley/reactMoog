import React, { Component } from 'react';
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
                    masterVol={this.state.gain}
                />
                <div className='container-fluid'>
                    <div className='row control-face align-items-stretch'>


{/* ---------------  CONTROLLERS  --------------- */}


                        <div className='col controllers d-flex flex-column pt-5 pb-3 bg-primary'>
                            <div className='row m-2'>
                                <div className='col-12 knob'>
                                    <label htmlFor='controllers__tune'>TUNE</label>
                                    <Knob
                                        className='controllers__tune'
                                        id='controllers__tune'
                                        value={this.state.controllers.tune}
                                        min={-500}
                                        max={500}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'controllers', 'tune')}
                                    />
                                </div>
                            </div>
                            <div className='row m-2'>
                                <div className='col-6 knob'>
                                    <label htmlFor='controllers__glide'>GLIDE</label>
                                    <Knob
                                        className='controllers__glide'
                                        id='controllers__glide'
                                        value={this.state.controllers.glide}
                                        min={0}
                                        max={10}
                                        step={0.01}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'controllers', 'glide')}
                                    />
                                </div>
                                <div className='col-6 knob'>
                                    <label htmlFor='controllers__modulation-mix'>MODULATION MIX</label>
                                    <Knob
                                        className='controllers__modulation-mix'
                                        id='controllers__modulation-mix'
                                        value={this.state.controllers.modulationMix}
                                        min={0}
                                        max={10}
                                        step={0.01}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'controllers', 'modulationMix')}
                                    />
                                </div>
                            </div>
                            <div className='row m-2 mt-5'>
                                <div className='col-6 d-flex justify-content-center switch'>
                                    <Switch
                                        className='controllers__oscillator-three-switch'
                                        checked={this.state.controllers.oscillatorThreeSwitch}
                                        onChange={value => this.handleOnChange(value, 'controllers', 'oscillatorThreeSwitch')}
                                    />
                                </div>
                                <div className='col-6 d-flex justify-content-center switch'>
                                    <Switch
                                        className='col-6 controllers__noise-switch'
                                        checked={this.state.controllers.noiseSwitch}
                                        onChange={value => this.handleOnChange(value, 'controllers', 'noiseSwitch')}
                                    />
                                </div>
                            </div>
                            <h3 className='text-center mt-auto'>CONTROLLERS</h3>
                        </div>


{/* ---------------  OSCILLATOR BANK  --------------- */}


                        <div className='col oscillator-bank d-flex flex-column py-3 bg-success'>
                            <div className='row m-2'>
                                <div className='col-4 knob'>
                                    <label htmlFor='oscillator-bank__range-one'>RANGE</label>
                                    <Knob
                                        className='oscillator-bank__range-one'
                                        id='oscillator-bank__range-one'
                                        value={this.state.oscillatorBank.rangeOne}
                                        min={0}
                                        max={5}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={100}
                                        clampMax={260}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'oscillatorBank', 'rangeOne')}
                                    />
                                </div>
                                <div className='col-4 text-center'>
                                    <h5>OSCILLATOR-1</h5>
                                    <p>FREQUENCY</p>
                                </div>
                                <div className='col-4 knob'>
                                    <label htmlFor='oscillator-bank__waveform-one'>WAVEFORM</label>
                                    <Knob
                                        className='oscillator-bank__waveform-one'
                                        id='oscillator-bank__waveform-one'
                                        value={this.state.oscillatorBank.waveformOne}
                                        min={0}
                                        max={5}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={100}
                                        clampMax={260}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'oscillatorBank', 'waveformOne')}
                                    />
                                </div>
                            </div>
                            <div className='row m-2'>
                                <div className='col-4 knob align-items-end'>
                                    <Knob
                                        className='oscillator-bank__range-two'
                                        id='oscillator-bank__range-two'
                                        value={this.state.oscillatorBank.rangeTwo}
                                        min={0}
                                        max={5}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={100}
                                        clampMax={260}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'oscillatorBank', 'rangeTwo')}
                                    />
                                </div>
                                <div className='col-4 knob'>
                                    <label htmlFor='oscillator-bank__frequency-two'><h5>OSCILLATOR-2</h5></label>
                                    <Knob
                                        className='oscillator-bank__frequency-two'
                                        id='oscillator-bank__frequency-two'
                                        value={this.state.oscillatorBank.frequencyTwo}
                                        min={-800}
                                        max={800}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={100}
                                        clampMax={260}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'oscillatorBank', 'frequencyTwo')}
                                    />
                                </div>
                                <div className='col-4 knob align-items-end'>
                                    <Knob
                                        className='oscillator-bank__waveform-two'
                                        id='oscillator-bank__waveform-two'
                                        value={this.state.oscillatorBank.waveformTwo}
                                        min={0}
                                        max={5}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={100}
                                        clampMax={260}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'oscillatorBank', 'waveformTwo')}
                                    />
                                </div>
                            </div>
                            <div className='row m-2'>
                                <div className='col-4 knob align-items-end'>
                                    <Knob
                                        className='oscillator-bank__range-three'
                                        id='oscillator-bank__range-three'
                                        value={this.state.oscillatorBank.rangeThree}
                                        min={0}
                                        max={5}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={100}
                                        clampMax={260}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'oscillatorBank', 'rangeThree')}
                                    />
                                </div>
                                <div className='col-4 knob'>
                                    <label htmlFor='oscillator-bank__frequency-three'><h5>OSCILLATOR-3</h5></label>
                                    <Knob
                                        className='oscillator-bank__frequency-three'
                                        id='oscillator-bank__frequency-three'
                                        value={this.state.oscillatorBank.frequencyThree}
                                        min={-800}
                                        max={800}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={100}
                                        clampMax={260}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'oscillatorBank', 'frequencyThree')}
                                    />
                                </div>
                                <div className='col-4 knob align-items-end'>
                                    <Knob
                                        className='oscillator-bank__waveform-three'
                                        id='oscillator-bank__waveform-three'
                                        value={this.state.oscillatorBank.waveformThree}
                                        min={0}
                                        max={5}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={100}
                                        clampMax={260}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'oscillatorBank', 'waveformThree')}
                                    />
                                </div>
                            </div>
                            <h3 className='text-center mt-auto'>OSCILLATOR BANK</h3>
                        </div>


{/* ---------------  MIXER  --------------- */}


                        <div className='col mixer d-flex flex-column py-3 text-center bg-primary'>
                            <div className='row align-items-end'>
                                <div className='col-3 knob'>
                                    <label htmlFor='mixer__volume-one'>VOLUME</label>
                                    <Knob
                                        className='mixer__volume-one'
                                        id='mixer__volume-one'
                                        value={this.state.mixer.volumeOne}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'volumeOne')}
                                    />
                                </div>
                                <div className='col-3 switch'>
                                    <Switch
                                        className='mixer__volume-one-switch'
                                        checked={this.state.mixer.volumeOneSwitch}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'volumeOneSwitch')}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label htmlFor='mixer__external-input-volume' className='text-nowrap'>EXTERNAL<br/>INPUT VOLUME</label>
                                </div>
                                <div className='col-3 text-center justify-content-center lift'>
                                    <label htmlFor='mixer__filter-modulation-switch'>FILTER MODULATION</label>
                                    <Switch
                                        className='mixer__filter-modulation-switch'
                                        id='mixer__filter-modulation-switch'
                                        checked={this.state.mixer.filterModulationSwitch}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'filterModulationSwitch')}
                                    />
                                </div>
                            </div>
                            <div className='row align-items-end'>
                                <div className='col-3 offset-3 switch'>
                                    <Switch
                                        className='mixer__external-input-volume-switch'
                                        checked={this.state.mixer.externalInputVolumeSwitch}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'externalInputVolumeSwitch')}
                                    />
                                </div>
                                <div className='col-3 knob'>
                                    <Knob
                                        className='mixer__external-input-volume'
                                        id='mixer__external-input-volume'
                                        value={this.state.mixer.externalInputVolume}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'externalInputVolume')}
                                    />
                                </div>
                                <div className='col-3 text-center lift'>
                                    <Switch
                                        className='mixer__keyboard-control-one'
                                        checked={this.state.mixer.keyboardControlOne}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'keyboardControlOne')}
                                    />
                                </div>
                            </div>
                            <div className='row align-items-end'>
                                <div className='col-3 knob'>
                                    <Knob
                                        className='mixer__volume-two'
                                        value={this.state.mixer.volumeTwo}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'volumeTwo')}
                                    />
                                </div>
                                <div className='col-3 switch'>
                                    <Switch
                                        className='mixer__volume-two-switch'
                                        checked={this.state.mixer.volumeTwoSwitch}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'volumeTwoSwitch')}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label htmlFor='mixer__noise-volume'>NOISE VOLUME</label>
                                </div>
                                <div className='col-3 text-center lift'>
                                    <label htmlFor='mixer__keyboard-control-two'>KEYBOARD CONTROL</label>
                                    <Switch
                                        className='mixer__keyboard-control-two'
                                        id='mixer__keyboard-control-two'
                                        checked={this.state.mixer.keyboardControlTwo}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'keyboardControlTwo')}
                                    />
                                </div>
                            </div>
                            <div className='row align-items-end'>
                                <div className='col-3 offset-3 switch'>
                                    <Switch
                                        className='mixer__noise-volume-switch'
                                        checked={this.state.mixer.noiseVolumeSwitch}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'noiseVolumeSwitch')}
                                    />
                                </div>
                                <div className='col-3 knob'>
                                    <Knob
                                        className='mixer__noise-volume'
                                        value={this.state.mixer.noiseVolume}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'noiseVolume')}
                                    />
                                </div>
                                <div className='col-1 text-center'>
                                    <Switch
                                        className='mixer__keyboard-control-two'
                                        id='mixer__keyboard-control-two'
                                        checked={this.state.mixer.keyboardControlTwo}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'keyboardControlTwo')}
                                    />
                                </div>
                            </div>
                            <div className='row align-items-end'>
                                <div className='col-3 knob'>
                                    <Knob
                                        className='mixer__volume-three'
                                        value={this.state.mixer.volumeThree}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'volumeThree')}
                                    />
                                </div>
                                <div className='col-3 switch'>
                                    <Switch
                                        className='mixer__volume-three-switch'
                                        checked={this.state.mixer.volumeThreeSwitch}
                                        onChange={value => this.handleOnChange(value, 'mixer', 'volumeThreeSwitch')}
                                    />
                                </div>
                            </div>
                            <h3 className='text-center mt-auto'>MIXER</h3>
                        </div>


{/* ---------------  MODIFIERS  --------------- */}


                        <div className='col modifiers d-flex flex-column py-3 text-center bg-success'>


{/* ---------------  FILTER  --------------- */}


                            <h4 className='text-center'>FILTER</h4>
                            <div className='row modifiers__filter'>
                                <div className='col-4 knob'>
                                    <label htmlFor='filter__cutoff-frequency'>CUTOFF FREQUENCY</label>
                                    <Knob
                                        className='filter__cutoff-frequency'
                                        id='filter__cutoff-frequency'
                                        value={this.state.filter.cutoffFrequency}
                                        min={-5}
                                        max={5}
                                        step={0.01}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'filter', 'cutoffFrequency')}
                                    />
                                </div>
                                <div className='col-4 knob'>
                                    <label htmlFor='filter__emphasis'>EMPHASIS</label>
                                    <Knob
                                        className='filter__emphasis'
                                        id='filter__emphasis'
                                        value={this.state.filter.emphasis}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'filter', 'emphasis')}
                                    />
                                </div>
                                <div className='col-4 knob'>
                                    <label htmlFor='filter__amount-of-contour'>AMOUNT<br/>OF CONTOUR</label>
                                    <Knob
                                        className='filter__amount-of-contour'
                                        id='filter__amount-of-contour'
                                        value={this.state.filter.amountOfContour}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'filter', 'amountOfContour')}
                                    />
                                </div>
                            </div>
                            <div className='row mt-1 modifiers__filter'>
                                <div className='col-4 knob'>
                                    <label htmlFor='filter__attack-time'>ATTACK TIME</label>
                                    <Knob
                                        className='filter__attack-time'
                                        id='filter__attack-time'
                                        value={this.state.filter.attackTime}
                                        min={0}
                                        max={2000}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'filter', 'attackTime')}
                                    />
                                </div>
                                <div className='col-4 knob'>
                                    <label htmlFor='filter__decay-time'>DECAY TIME</label>
                                    <Knob
                                        className='filter__decay-time'
                                        id='filter__decay-time'
                                        value={this.state.filter.decayTime}
                                        min={0}
                                        max={2000}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'filter', 'decayTime')}
                                    />
                                </div>
                                <div className='col-4 knob'>
                                    <label htmlFor='filter__sustain-level'>SUSTAIN LEVEL</label>
                                    <Knob
                                        className='filter__sustain-level'
                                        id='filter__sustain-level'
                                        value={this.state.filter.sustainLevel}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'filter', 'sustainLevel')}
                                    />
                                </div>
                            </div>


{/* ---------------  LOUDNESS CONTOUR  --------------- */}


                            <h4 className='text-center mt-3'>LOUDNESS CONTOUR</h4>
                            <div className='row modifiers__loudness-contour'>
                                <div className='col-4 knob'>
                                    <label htmlFor='loudness-contour__attack-time'>ATTACK TIME</label>
                                    <Knob
                                        className='loudness-contour__attack-time'
                                        id='loudness-contour__attack-time'
                                        value={this.state.loudnessContour.attackTime}
                                        min={0}
                                        max={2000}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'loudnessContour', 'attackTime')}
                                    />
                                </div>
                                <div className='col-4 knob'>
                                    <label htmlFor='loudness-contour__decay-time'>DECAY TIME</label>
                                    <Knob
                                        className='loudness-contour__decay-time'
                                        id='loudness-contour__decay-time'
                                        value={this.state.loudnessContour.decayTime}
                                        min={0}
                                        max={2000}
                                        step={1}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'loudnessContour', 'decayTime')}
                                    />
                                </div>
                                <div className='col-4 knob'>
                                    <label htmlFor='loudness-contour__sustain-level'>SUSTAIN LEVEL</label>
                                    <Knob
                                        className='loudness-contour__sustain-level'
                                        id='loudness-contour__sustain-level'
                                        value={this.state.loudnessContour.sustainLevel}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        rotateDegrees={180}
                                        clampMin={30}
                                        clampMax={330}
                                        skin={skins.s16}
                                        preciseMode={false}
                                        onChange={value => this.handleOnChange(value, 'loudnessContour', 'sustainLevel')}
                                    />
                                </div>
                            </div>
                            <h3 className='text-center mt-auto'>MODIFIERS</h3>
                        </div>


{/* ---------------  OUTPUT  -------------- */}


                        <div className='col d-flex flex-column justify-content-center align-items-center pt-5 pb-3 output bg-primary'>
                            <label htmlFor='output__volume'>VOLUME</label>
                            <Knob
                                className='output__volume'
                                id='output__volume'
                                value={this.state.output.volume}
                                min={0}
                                max={1}
                                step={0.01}
                                rotateDegrees={180}
                                clampMin={30}
                                clampMax={330}
                                skin={skins.s16}
                                preciseMode={false}
                                onChange={value => this.handleOnChange(value, 'output', 'volume')}
                            />
                            <h3 className='text-center mt-auto'>OUTPUT</h3>
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