import React, { Component } from "react";
//import axios from "axios";
import Hotel from "./Hotel";
import "./styles/Hotels.css";

export default class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [
        {
          minTotalPrice: 500,
          currencyCode: "USD",
          reviewScore: 5,
          address: "123 Fake St",
          photos:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Tamatsukuri_onsen_yado02s3648.jpg/1024px-Tamatsukuri_onsen_yado02s3648.jpg",
          city: "Tokyo",
          hotelName: "Nate's Ryokan"
        },
        {
          minTotalPrice: 5,
          currencyCode: "USD",
          reviewScore: 1,
          address: "124 Fake St",
          photos:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Ryokan_interior%2C_door_and_stairs.jpg/1024px-Ryokan_interior%2C_door_and_stairs.jpg",
          city: "Osaka",
          hotelName: "Nathan's Ryokan"
        },
        {
          minTotalPrice: 50,
          currencyCode: "USD",
          reviewScore: 3,
          address: "125 Fake St",
          photos:
            "https://photos.smugmug.com/Osaka/Osaka-Categories/i-7XbMJwd/0/XL/Osaka_Ryokan-XL.jpg",
          city: "Fukuoka",
          hotelName: "Nathaniel's Ryokan"
        }
      ],
      currentHotel: 0
    };
  }

  componentDidMount() {
    // axios.post("/api/hotels", {
    //   city: this.props.cityName,
    //   arrivalDate: this.props.arrivalDate,
    //   departureDate: this.props.departureDate,
    //   minPrice: this.props.minPrice,
    //   maxPrice: this.props.maxPrice
    // });
  }

  getNextHotel = () => {
    const hotelAmount = this.state.hotels.length - 1;
    const newHotel = this.state.currentHotel + 1;
    if (this.state.currentHotel === hotelAmount) {
      this.setState({ currentHotel: 0 });
    } else {
      this.setState({ currentHotel: newHotel });
    }
  };

  getPrevHotel = () => {
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
          name={hotel.hotelName}
          city={hotel.city}
          address={hotel.address}
          review={
            hotel.reviewScore + (hotel.reviewScore === 1 ? " Star" : " Stars")
          }
          price={hotel.minTotalPrice + " " + hotel.currencyCode}
        />
      );
    });

    return (
      <div className="hotels">
        <h2>YOUR HOTEL</h2>
        <div className="selectedHotel">
          <img
            className="arrow"
            src="https://img.icons8.com/flat_round/64/000000/arrow-left.png"
            alt="Left"
            onClick={this.getPrevHotel}
          ></img>
          <center type="text" className="hotelInfo">
            {hotels[this.state.currentHotel]}
          </center>
          <img
            className="arrow"
            src="https://img.icons8.com/flat_round/64/000000/arrow-right.png"
            alt="Right"
            onClick={this.getNextHotel}
          ></img>
        </div>
      </div>
    );
  }
}
