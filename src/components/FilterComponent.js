import React from 'react';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';

function Filter(props) {
    const { handleKnobChange } = props;

    return(
        <React.Fragment>
            <h4 className='text-center'>FILTER</h4>
            <div className='row modifiers__filter'>
                <div className='col-4 knob'>
                    <label htmlFor='filter__cutoff-frequency'>CUTOFF FREQUENCY</label>
                    <Knob
                        className='filter__cutoff-frequency'
                        id='filter__cutoff-frequency'
                        value={props.filter.cutoffFrequency}
                        min={-5}
                        max={5}
                        step={0.01}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'filter', 'cutoffFrequency')}
                    />
                </div>
                <div className='col-4 knob'>
                    <label htmlFor='filter__emphasis'>EMPHASIS</label>
                    <Knob
                        className='filter__emphasis'
                        id='filter__emphasis'
                        value={props.filter.emphasis}
                        min={0}
                        max={1}
                        step={0.01}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'filter', 'emphasis')}
                    />
                </div>
                <div className='col-4 knob'>
                    <label htmlFor='filter__amount-of-contour'>AMOUNT<br/>OF CONTOUR</label>
                    <Knob
                        className='filter__amount-of-contour'
                        id='filter__amount-of-contour'
                        value={props.filter.amountOfContour}
                        min={0}
                        max={1}
                        step={0.01}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'filter', 'amountOfContour')}
                    />
                </div>
            </div>
            <div className='row mt-1 modifiers__filter border-bottom'>
                <div className='col-4 knob'>
                    <label htmlFor='filter__attack-time'>ATTACK TIME</label>
                    <Knob
                        className='filter__attack-time'
                        id='filter__attack-time'
                        value={props.filter.attackTime}
                        min={0}
                        max={2000}
                        step={1}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'filter', 'attackTime')}
                    />
                </div>
                <div className='col-4 knob'>
                    <label htmlFor='filter__decay-time'>DECAY TIME</label>
                    <Knob
                        className='filter__decay-time'
                        id='filter__decay-time'
                        value={props.filter.decayTime}
                        min={0}
                        max={2000}
                        step={1}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'filter', 'decayTime')}
                    />
                </div>
                <div className='col-4 knob'>
                    <label htmlFor='filter__sustain-level'>SUSTAIN LEVEL</label>
                    <Knob
                        className='filter__sustain-level'
                        id='filter__sustain-level'
                        value={props.filter.sustainLevel}
                        min={0}
                        max={1}
                        step={0.01}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'filter', 'sustainLevel')}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Filter;