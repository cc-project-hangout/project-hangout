import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filtered: false,
      selections: {
        cityName: "",
        arrivalDate: "",
        departureDate: "",
        minPrice: 0,
        maxPrice: 0,
        budget: 0
      }
    };
  }

  render() {
    return (
      <div className="App">
        <form className="user-input">
          <input type="text" placeholder="City"></input>
          <input type="date" placeholder="Arrival Date"></input>
          <input type="date" placeholder="Departure Date"></input>
          <div>
            <input type="number" className="hotel-price" pattern="[0-9]*" min="0" max="9999" placeholder="Hotel Min Price"></input>
            <input type="number" className="hotel-price" pattern="[0-9]*" min="0" max="9999" placeholder="Hotel Max Price"></input>
          </div>
          <input type="number" pattern="[0-9]*" min="0" max="9999" placeholder="Play Budget"></input>
          <p>
            THIS IS A PLACEHOLDER FOR ALL THE INFO
          </p>
          <p>
            HELLO THERE
          </p>
        </form>
      </div>
    );
  }
}
