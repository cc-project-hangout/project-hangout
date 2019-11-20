import React from 'react';
import './App.css';
import Events from './components/Events'
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

  handleSeachClicked = (e) => {
    e.preventDefault();
    //add input validation

    console.log("started search");
    this.setState({filtered: true})
  }

  handleBackOrCancel = (e) => {
    e.preventDefault();

    this.setState({filtered: false});
  }

  render() {
    return (
      <div className="App">
        { !this.state.filtered ? (
          <form className="user-input" value="">
            <input type="text" placeholder="City"></input>
            <label for="startDate">arrival Date</label>
            <input id="startDate" type="date"></input>
            <input type="date" placeholder="Departure Date"></input>
            <div className="two-column-div">
              <input type="number" className="hotel-price" pattern="[0-9]*" min="0" max="9999" placeholder="Hotel Min Price"></input>
              <input type="number" className="hotel-price" pattern="[0-9]*" min="0" max="9999" placeholder="Hotel Max Price"></input>
            </div>
            <input type="number" pattern="[0-9]*" min="0" max="9999" placeholder="Play Budget"></input>

            <div className="two-column-div">
              <button className="form-button" onClick={(e) => {this.handleSeachClicked(e)}}> SEARCH </button>
              <button className="form-button" onClick={(e) => {this.handleBackOrCancel(e)}}> CLEAR </button>
            </div>
          </form>
        ) : (
          <form className="user-input" value="">
            <button className="goHome" onClick={(e) => {this.handleBackOrCancel(e)}}> GO BACK TO SEARCH </button>
          
              <Events />
            

          </form>

        ) }
      </div>
    );
  }
}
