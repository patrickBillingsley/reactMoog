function createOscillator(ctx) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    osc.start();

    return {osc, gain};
};

export function createOscillatorBank(count, ctx) {
    const oscillatorBank = [];

    for(let i = 0; i < count; i++) {
        const osc = createOscillator(ctx);
        oscillatorBank.push(osc);
    }

    return oscillatorBank;
}