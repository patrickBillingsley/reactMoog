import React, { useContext } from 'react';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';
import { SynthCtx } from './SynthFunctionalComponent';

function KnobComponent({ config }) {
    const ctx = useContext(SynthCtx);
    const { id, osc, sub, type, min, max, step, rotateDegrees, clampMin, clampMax, skin } = config;

    return(
        <Knob
            className={id}
            id={id}
            osc={osc || null}
            value={sub ? ctx.state[sub][osc][type] : ctx.state[type]}
            min={min || 0}
            max={max || 10}
            step={step || 1}
            rotateDegrees={rotateDegrees|| 180}
            clampMin={clampMin || 30}
            clampMax={clampMax || 330}
            skin={skin || skins.s16}
            preciseMode={false}
            onChange={val => ctx.dispatch({ type: type, payload: { value: val, osc: osc }})}
        />
    );
};

export default KnobComponent;