import React, { Component } from "react";
import axios from "axios";
import "./styles/Cities.css";

export default class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
    };
  }

  componentDidMount() {
    this.validateCity();
  }

  validateCity() {
    axios
      .post("api/city", {
        city: this.props.cityName,
      })
      .then();
  }

  render() {
    return (
      <div className="user_input">
        <input id="cityName" type="text" placeholder="City" onChange={this.props.onChange}></input>
      </div>
    );
  }
}
