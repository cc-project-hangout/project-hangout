import React, {Component} from 'react';

export default class Event extends Component {

    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div>
            <div>{this.props.title}</div>
            <div>{this.props.url}</div>
            <div>{this.props.image}</div>
            <div>{this.props.venue}</div>
            <div>{this.props.description}</div>
            <div>{this.props.startTime}</div>
            </div>
        )

    }
}