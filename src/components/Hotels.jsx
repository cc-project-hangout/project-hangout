import React, { Component } from "react";
import axios from "axios";

export default class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [
        {
          min_total_price: 50000,
          currency_code: "JPY",
          review_score: 5,
          address: "123 Fake St",
          photos: "kfomfmvg",
          city: "Tokyo",
          hotel_name: "Nate's Inn"
        },
        {
          min_total_price: 500,
          currency_code: "JPY",
          review_score: 1,
          address: "124 Fake St",
          photos: "wffwfwf",
          city: "Osaka",
          hotel_name: "Nathan's Inn"
        }
      ]
    };
  }

  componentDidMount() {
    axios.post("/api/hotels", {
      city: this.props.selection.cityName,
      arrivalDate: this.props.selection.arrivalDate,
      departureDate: this.props.selection.departureDate,
      minPrice: this.props.selection.minPrice,
      maxPrice: this.props.selection.maxPrice
    });
  }

  getNewHotel() {
    return;
  }

  render() {
    return (
      <div className="hotel">
        <button onclick="getNewHotel()">Get New Hotel</button>
      </div>
    );
  }
}
