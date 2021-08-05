import React, { Component } from 'react';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';
// import Switch from 'react-switch';

class OscillatorBank extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='col-3 oscillator-bank d-flex flex-column py-3 border'>
                <div className='row m-2'>
                    <div className='col-4 knob'>
                        <label htmlFor='oscillator-bank__range-one'>RANGE</label>
                        <Knob
                            className='oscillator-bank__range-one'
                            id='oscillator-bank__range-one'
                            value={this.props.oscillatorBank.rangeOne}
                            min={0}
                            max={5}
                            step={1}
                            rotateDegrees={180}
                            clampMin={100}
                            clampMax={260}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'oscillatorBank', 'rangeOne')}
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
                            value={this.props.oscillatorBank.waveformOne}
                            min={0}
                            max={5}
                            step={1}
                            rotateDegrees={180}
                            clampMin={100}
                            clampMax={260}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'oscillatorBank', 'waveformOne')}
                        />
                    </div>
                </div>
                <div className='row m-2'>
                    <div className='col-4 knob align-items-end'>
                        <Knob
                            className='oscillator-bank__range-two'
                            id='oscillator-bank__range-two'
                            value={this.props.oscillatorBank.rangeTwo}
                            min={0}
                            max={5}
                            step={1}
                            rotateDegrees={180}
                            clampMin={100}
                            clampMax={260}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'oscillatorBank', 'rangeTwo')}
                        />
                    </div>
                    <div className='col-4 knob'>
                        <label htmlFor='oscillator-bank__frequency-two'><h5>OSCILLATOR-2</h5></label>
                        <Knob
                            className='oscillator-bank__frequency-two'
                            id='oscillator-bank__frequency-two'
                            value={this.props.oscillatorBank.frequencyTwo}
                            min={-800}
                            max={800}
                            step={1}
                            rotateDegrees={180}
                            clampMin={100}
                            clampMax={260}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'oscillatorBank', 'frequencyTwo')}
                        />
                    </div>
                    <div className='col-4 knob align-items-end'>
                        <Knob
                            className='oscillator-bank__waveform-two'
                            id='oscillator-bank__waveform-two'
                            value={this.props.oscillatorBank.waveformTwo}
                            min={0}
                            max={5}
                            step={1}
                            rotateDegrees={180}
                            clampMin={100}
                            clampMax={260}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'oscillatorBank', 'waveformTwo')}
                        />
                    </div>
                </div>
                <div className='row m-2'>
                    <div className='col-4 knob align-items-end'>
                        <Knob
                            className='oscillator-bank__range-three'
                            id='oscillator-bank__range-three'
                            value={this.props.oscillatorBank.rangeThree}
                            min={0}
                            max={5}
                            step={1}
                            rotateDegrees={180}
                            clampMin={100}
                            clampMax={260}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'oscillatorBank', 'rangeThree')}
                        />
                    </div>
                    <div className='col-4 knob'>
                        <label htmlFor='oscillator-bank__frequency-three'><h5>OSCILLATOR-3</h5></label>
                        <Knob
                            className='oscillator-bank__frequency-three'
                            id='oscillator-bank__frequency-three'
                            value={this.props.oscillatorBank.frequencyThree}
                            min={-800}
                            max={800}
                            step={1}
                            rotateDegrees={180}
                            clampMin={100}
                            clampMax={260}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'oscillatorBank', 'frequencyThree')}
                        />
                    </div>
                    <div className='col-4 knob align-items-end'>
                        <Knob
                            className='oscillator-bank__waveform-three'
                            id='oscillator-bank__waveform-three'
                            value={this.props.oscillatorBank.waveformThree}
                            min={0}
                            max={5}
                            step={1}
                            rotateDegrees={180}
                            clampMin={100}
                            clampMax={260}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'oscillatorBank', 'waveformThree')}
                        />
                    </div>
                </div>
                <h3 className='text-center mt-auto'>OSCILLATOR BANK</h3>
            </div>
        );
    }
}

export default OscillatorBank;