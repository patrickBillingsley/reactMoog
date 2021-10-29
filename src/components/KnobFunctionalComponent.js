import React, { useContext } from 'react';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';
import { SynthCtx } from './SynthFunctionalComponent';


const KnobComponent = ({ config }) => {
    const ctx = useContext(SynthCtx);

    return(
        <Knob
            className={config.id}
            id={config.id}
            value={ctx.value}
            min={config.min || 0}
            max={config.max || 10}
            step={config.step || 0.01}
            rotateDegrees={config.rotateDegrees|| 180}
            clampMin={config.clampMin || 30}
            clampMax={config.clampMax || 330}
            skin={config.skin || skins.s16}
            preciseMode={false}
            onChange={val => ctx.dispatch({ id: config.id, type: config.type, payload: { value: val } })}
        />
    );
};

export default KnobComponent;