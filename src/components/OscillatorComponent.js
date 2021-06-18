import React, { Component } from 'react';

class Oscillator extends Component {
    constructor(props) {
        super(props);

        this.osc = props.context.createOscillator();
    }
    
    componentDidMount() {
        this.osc.connect(this.props.context.destination);
        // this.osc.start()
    }

    componentDidUpdate(prevProps) {
        if(+prevProps.freq !== +this.props.freq) {
            this.osc.frequency.setValueAtTime(+this.props.freq, this.props.context.currentTime)
        }
    }

    render() {
        return null;
    }
}

export default Oscillator;