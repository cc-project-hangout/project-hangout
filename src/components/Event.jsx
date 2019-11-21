import React, { Component } from "react";
import "./styles/Event.css";
export default class Event extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="singleEventContainer">
        
            <div id="title">{this.props.title}</div>
            {/* <img id="image" src={this.props.image}></img> */}
        <div id="eventInfoContainer">

            <div id="eventText">
                <a href={this.props.url} id="url">Link to Event</a>
                <div id="venue">Location: {this.props.venue}</div>
                {/* <div id="description">{this.props.description}</div> */}
                <div id="startTime">Date & Time {this.props.startTime}</div>
            </div>
            
            <div id="eventPic"> 
                <img id="image" src={this.props.image}></img>
            </div>
            
        </div>
      </div>
    );
  }
}
