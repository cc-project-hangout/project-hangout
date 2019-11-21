import React, { Component } from "react";
import "./styles/Event.css";
export default class Event extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      let startTime = this.props.startTime;
      if(startTime.includes('00:00:00')) {
       startTime = startTime.replace('00:00:00', 'TBD')
      }
      console.log(startTime, 'hello')
    return (
      <div id="singleEventContainer">
        
            <div id="title">{this.props.title}</div>
            {/* <img id="image" src={this.props.image}></img> */}
        <div id="eventInfoContainer">

            <div id="eventText">
                <a href={this.props.url} id="url">Link to Event</a>
                <div id="venue">Location: {this.props.venue}</div>
                {/* <div id="description">{this.props.description}</div> */}
                <div id="startTime">Date & Time {startTime}</div>
            </div>
            
            <div id="eventPic"> 
                <img id="image" src={this.props.image}></img>
            </div>
            
        </div>
      </div>
    );
  }
}
