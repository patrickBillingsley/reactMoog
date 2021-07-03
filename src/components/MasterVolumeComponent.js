import React, { Component } from 'react';

class MasterVolume extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vol: null
        }
    }

    componentDidMount() {
        const { vol } = this.props;
        this.setState({ vol: vol })

        this.gain = this.props.context.createGain();
    }
    
    componentDidUpdate(prevProps) {
        // console.log(this.props.gainArray);
    }

    render() {
        return null;
    }
}

export default MasterVolume;