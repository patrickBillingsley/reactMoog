import React, { Component } from 'react';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';

class Filter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <h4 className='text-center'>FILTER</h4>
                <div className='row modifiers__filter'>
                    <div className='col-4 knob'>
                        <label htmlFor='filter__cutoff-frequency'>CUTOFF FREQUENCY</label>
                        <Knob
                            className='filter__cutoff-frequency'
                            id='filter__cutoff-frequency'
                            value={this.props.filter.cutoffFrequency}
                            min={-5}
                            max={5}
                            step={0.01}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'filter', 'cutoffFrequency')}
                        />
                    </div>
                    <div className='col-4 knob'>
                        <label htmlFor='filter__emphasis'>EMPHASIS</label>
                        <Knob
                            className='filter__emphasis'
                            id='filter__emphasis'
                            value={this.props.filter.emphasis}
                            min={0}
                            max={1}
                            step={0.01}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'filter', 'emphasis')}
                        />
                    </div>
                    <div className='col-4 knob'>
                        <label htmlFor='filter__amount-of-contour'>AMOUNT<br/>OF CONTOUR</label>
                        <Knob
                            className='filter__amount-of-contour'
                            id='filter__amount-of-contour'
                            value={this.props.filter.amountOfContour}
                            min={0}
                            max={1}
                            step={0.01}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'filter', 'amountOfContour')}
                        />
                    </div>
                </div>
                <div className='row mt-1 modifiers__filter border-bottom'>
                    <div className='col-4 knob'>
                        <label htmlFor='filter__attack-time'>ATTACK TIME</label>
                        <Knob
                            className='filter__attack-time'
                            id='filter__attack-time'
                            value={this.props.filter.attackTime}
                            min={0}
                            max={2000}
                            step={1}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'filter', 'attackTime')}
                        />
                    </div>
                    <div className='col-4 knob'>
                        <label htmlFor='filter__decay-time'>DECAY TIME</label>
                        <Knob
                            className='filter__decay-time'
                            id='filter__decay-time'
                            value={this.props.filter.decayTime}
                            min={0}
                            max={2000}
                            step={1}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'filter', 'decayTime')}
                        />
                    </div>
                    <div className='col-4 knob'>
                        <label htmlFor='filter__sustain-level'>SUSTAIN LEVEL</label>
                        <Knob
                            className='filter__sustain-level'
                            id='filter__sustain-level'
                            value={this.props.filter.sustainLevel}
                            min={0}
                            max={1}
                            step={0.01}
                            rotateDegrees={180}
                            clampMin={30}
                            clampMax={330}
                            skin={skins.s16}
                            preciseMode={false}
                            onChange={value => this.props.handleOnChange(value, 'filter', 'sustainLevel')}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default Filter;