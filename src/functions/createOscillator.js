export function createOscillator(ctx, out) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(out);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    osc.start();

    return [osc, gain];
};