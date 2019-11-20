import React, { Component } from "react";
import axios from "axios";
import Hotel from "./Hotel";
import "./styles/Hotels.css";

export default class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      currentHotel: 0,
    };
  }

  componentDidMount() {
    this.getHotels();
  }

  getHotels = () => {
    axios
      .post("api/hotels", {
        city: this.props.cityName,
        arrivalDate: this.props.arrivalDate,
        departureDate: this.props.departureDate,
        minPrice: this.props.minPrice,
        maxPrice: this.props.maxPrice,
      })
      .then(list => {
        console.log(list);
        this.setState({ hotels: list.data ? list.data.filter(x => x !== null) : [] }, function() {
          console.log(this.state);
        });
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

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
          key={this.state.currentHotel}
          image={hotel.photos.replace("square60", "square300")}
          name={hotel.hotelName}
          city={hotel.city}
          zip={hotel.zip}
          address={hotel.address}
          review={hotel.reviewScore + (hotel.reviewScore === 1 ? " Star" : " Stars")}
          price={hotel.minTotalPrice + " " + hotel.currencyCode}
          available={hotel.roomsLeft + " " + (hotel.roomsLeft === 1 ? " Room Left" : " Rooms Left")}
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
