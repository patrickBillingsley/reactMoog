import React, { Component } from 'react';

class Oscillator extends Component {
    constructor(props) {
        super(props);

        this.osc = props.context.createOscillator();
        this.gain = props.context.createGain();
    }
    
    componentDidMount() {
        this.osc.connect(this.gain);
        this.gain.connect(this.props.context.destination);
        this.gain.gain.setValueAtTime(0, this.props.context.currentTime);
        this.osc.start()
    }

    componentDidUpdate(prevProps) {
        // Sets the oscillator's frequency if the frequency in props has changed
        if(+prevProps.freq !== +this.props.freq) {
            this.osc.frequency.setValueAtTime(+this.props.freq, this.props.context.currentTime)
        }
        // Sets the oscillator's gain node up while the mouse is over the keyboard
        if(prevProps.isPlaying !== this.props.isPlaying) {
            if(this.props.isPlaying) {
                this.gain.gain.setValueAtTime(0.5, this.props.context.currentTime);
            } else {
                this.gain.gain.setValueAtTime(0, this.props.context.currentTime);
            }
        }
    }

    render() {
        return null;
    }
}

export default Oscillator;