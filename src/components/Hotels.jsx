import React, { Component } from "react";
// import axios from "axios";
import Hotel from "./Hotel";
import "./styles/Hotels.css";

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
          photos:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Tamatsukuri_onsen_yado02s3648.jpg/1024px-Tamatsukuri_onsen_yado02s3648.jpg",
          city: "Tokyo",
          hotel_name: "Nate's Ryokan"
        },
        {
          min_total_price: 500,
          currency_code: "JPY",
          review_score: 1,
          address: "124 Fake St",
          photos:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Ryokan_interior%2C_door_and_stairs.jpg/1024px-Ryokan_interior%2C_door_and_stairs.jpg",
          city: "Osaka",
          hotel_name: "Nathan's Ryokan"
        },
        {
          min_total_price: 5000,
          currency_code: "JPY",
          review_score: 3,
          address: "125 Fake St",
          photos:
            "https://photos.smugmug.com/Osaka/Osaka-Categories/i-7XbMJwd/0/XL/Osaka_Ryokan-XL.jpg",
          city: "Fukuoka",
          hotel_name: "Nathaniel's Ryokan"
        }
      ],
      currentHotel: 2
    };
  }

  componentDidMount() {
    // axios.post("/api/hotels", {
    //   city: this.props.selection.cityName,
    //   arrivalDate: this.props.selection.arrivalDate,
    //   departureDate: this.props.selection.departureDate,
    //   minPrice: this.props.selection.minPrice,
    //   maxPrice: this.props.selection.maxPrice
    // });
  }

  getNewHotel = () => {
    const hotelAmount = this.state.hotels.length - 1;
    const newHotel = this.state.currentHotel - 1;
    if (this.state.currentHotel === 0) {
      this.setState({ currentHotel: hotelAmount });
    } else {
      this.setState({ currentHotel: newHotel });
    }
  };

  render() {
    const hotels = this.state.hotels.map(hotel => {
      return (
        <Hotel
          image={hotel.photos}
          name={hotel.hotel_name}
          city={hotel.city}
          address={hotel.address}
          review={hotel.review_score + " Stars"}
          price={hotel.min_total_price + " " + hotel.currency_code}
        />
      );
    });

    return (
      <div className="selectedHotel">
        <span type="text">YOUR HOTEL</span>
        {hotels[this.state.currentHotel]}
        <div onClick={this.getNewHotel}>Get New Hotel</div>
      </div>
    );
  }
}
