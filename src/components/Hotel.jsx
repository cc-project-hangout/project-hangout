import React, { Component } from "react";
import "./styles/Hotel.css";

export default class Hotel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="hotelLayout">
        <div className="hotelImage">
          <img
            src={this.props.image}
            alt="hotelphoto"
            onError={e => {
              e.target.src = "https://cdn4.iconfinder.com/data/icons/map-pins-2/256/15-512.png";
            }}
            height="100px"
            width="100px"
          />
        </div>

        <div>Name: {this.props.name}</div>
        <div>Address: {this.props.address + " " + this.props.city + ", " + this.props.zip}</div>
        <div>Score: {this.props.review}</div>
        <div>Price: {this.props.price}</div>
        <div>Rooms Left: {this.props.available}</div>
      </div>
    );
  }
}
