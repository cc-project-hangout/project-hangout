import React, { Component } from "react";
import "./styles/Event.css";
export default class Event extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="eventContainer">
        <div id="title">{this.props.title}</div>
        <div id="url">{this.props.url}</div>
        <img id="image" src={this.props.image}></img>
        <div id="venue">{this.props.venue}</div>
        <div id="description">{this.props.description}</div>
        <div id="startTime">{this.props.startTime}</div>
      </div>
    );
  }
}
