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
          min_total_price: 500,
          currency_code: "USD",
          review_score: 5,
          address: "123 Fake St",
          photos:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Tamatsukuri_onsen_yado02s3648.jpg/1024px-Tamatsukuri_onsen_yado02s3648.jpg",
          city: "Tokyo",
          hotel_name: "Nate's Ryokan"
        },
        {
          min_total_price: 5,
          currency_code: "USD",
          review_score: 1,
          address: "124 Fake St",
          photos:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Ryokan_interior%2C_door_and_stairs.jpg/1024px-Ryokan_interior%2C_door_and_stairs.jpg",
          city: "Osaka",
          hotel_name: "Nathan's Ryokan"
        },
        {
          min_total_price: 50,
          currency_code: "USD",
          review_score: 3,
          address: "125 Fake St",
          photos:
            "https://photos.smugmug.com/Osaka/Osaka-Categories/i-7XbMJwd/0/XL/Osaka_Ryokan-XL.jpg",
          city: "Fukuoka",
          hotel_name: "Nathaniel's Ryokan"
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
          name={hotel.hotel_name}
          city={hotel.city}
          address={hotel.address}
          review={hotel.review_score + " Stars"}
          price={hotel.min_total_price + " " + hotel.currency_code}
        />
      );
    });

    return (
      <div className="hotels">
        <h3>YOUR HOTEL</h3>
        <div className="selectedHotel">
          <div className="prevHotel" onClick={this.getPrevHotel}>
            Get Prev Hotel
          </div>
          <span type="text" className="hotelInfo">
            {hotels[this.state.currentHotel]}
          </span>
          <div className="nextHotel" onClick={this.getNextHotel}>
            Get Next Hotel
          </div>
        </div>
      </div>
    );
  }
}
