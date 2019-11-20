import React, { Component } from "react";
import axios from "axios";

export default class Hotels extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get("/api/hotels", {
        city:
    });
  }

  render() {
    return <div className="hotelList"></div>;
  }
}
