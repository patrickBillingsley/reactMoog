import React from 'react';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';

function LoudnessContour(props) {
    const { handleKnobChange } = props;

    return(
        <React.Fragment>
            <h4 className='text-center mt-3'>LOUDNESS CONTOUR</h4>
            <div className='row modifiers__loudness-contour'>
                <div className='col-4 knob'>
                    <label htmlFor='loudness-contour__attack-time'>ATTACK TIME</label>
                    <Knob
                        className='loudness-contour__attack-time'
                        id='loudness-contour__attack-time'
                        value={props.loudnessContour.attackTime}
                        min={0}
                        max={2000}
                        step={1}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'loudnessContour', 'attackTime')}
                    />
                </div>
                <div className='col-4 knob'>
                    <label htmlFor='loudness-contour__decay-time'>DECAY TIME</label>
                    <Knob
                        className='loudness-contour__decay-time'
                        id='loudness-contour__decay-time'
                        value={props.loudnessContour.decayTime}
                        min={0}
                        max={2000}
                        step={1}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'loudnessContour', 'decayTime')}
                    />
                </div>
                <div className='col-4 knob'>
                    <label htmlFor='loudness-contour__sustain-level'>SUSTAIN LEVEL</label>
                    <Knob
                        className='loudness-contour__sustain-level'
                        id='loudness-contour__sustain-level'
                        value={props.loudnessContour.sustainLevel}
                        min={0}
                        max={1}
                        step={0.01}
                        rotateDegrees={180}
                        clampMin={30}
                        clampMax={330}
                        skin={skins.s16}
                        preciseMode={false}
                        onChange={value => handleKnobChange(value, 'loudnessContour', 'sustainLevel')}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default LoudnessContour;