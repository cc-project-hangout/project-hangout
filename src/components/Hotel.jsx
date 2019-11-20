import React, { Component } from "react";

export default class Hotel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <img src={this.props.image} alt="hotelphoto" width="100" height="100" />
        <div>Name: {this.props.name}</div>
        <div>City: {this.props.city}</div>
        <div>Address: {this.props.address}</div>
        <div>Score: {this.props.review}</div>
        <div>Price: {this.props.price}</div>
      </div>
    );
  }
}
