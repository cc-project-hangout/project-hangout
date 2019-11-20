import React from "react";
import "./App.css";
import Events from "./components/Events";
import Hotels from "./components/Hotels";
import logo_name from "./assets/logo_name_white.png";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filtered: false,
      allCityOptions: [],
      selections: {
        cityName: "Tokyo",
        arriveDate: "2019-06-20",
        departDate: "",
        minPrice: 0,
        maxPrice: 9999,
        budget: 0,
      },
      datepicker: {
        arriveDate: "text",
        departDate: "text",
      },
    };
  }

  handleSeachClicked = e => {
    e.preventDefault();
    if (this.formValidation()) {
      console.log("Params are OK.Started search.");
      this.setState({ filtered: true });
    } else {
      this.setState({ dataInvalid: true });
    }
  };

  handleBackOrCancel = e => {
    e.preventDefault();

    this.setState({
      dataInvalid: false,
      filtered: false,
      selections: {
        cityName: "",
        arriveDate: "",
        departDate: "",
        minPrice: 0,
        maxPrice: 9999,
        budget: 0,
      },
    });
  };

  handleDateField(e) {
    let newType = "text";
    if (e.target.type === "text") {
      newType = "date";
    }
    if (e.target.id === "arriveDate") {
      this.setState({ datepicker: { arriveDate: newType } });
    } else if (e.target.id === "departDate") {
      this.setState({ datepicker: { departDate: newType } });
    }
  }

  setCity = e => {
    this.setState({ selections: { ...this.state.selections, cityName: e.target.value } });
  };
  setArrival = e => {
    const arrivalDateUnix = new Date(e.target.value).getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    const nextDayUnix = arrivalDateUnix + oneDay;
    const nextDay = new Date(nextDayUnix);
    const nextDayString = `${nextDay.getUTCFullYear()}-${String(nextDay.getUTCMonth() + 1).padStart(2, "0")}-${String(
      nextDay.getUTCDate()
    ).padStart(2, "0")}`;
    this.setState({ selections: { ...this.state.selections, arriveDate: e.target.value, departDate: nextDayString } });
  };
  setDeparture = e => {
    this.setState({ selections: { ...this.state.selections, departDate: e.target.value } });
  };
  setHotelMin = e => {
    this.setState({ selections: { ...this.state.selections, minPrice: e.target.value } });
  };
  setHotelMax = e => {
    this.setState({ selections: { ...this.state.selections, maxPrice: e.target.value } });
  };
  setBudget = e => {
    this.setState({ selections: { ...this.state.selections, budget: e.target.value } });
  };

  formValidation = () => {
    const city = this.state.selections.cityName;
    const startDateUnix = new Date(this.state.selections.arriveDate);
    const endDateUnix = new Date(this.state.selections.departDate);
    return (
      city !== "" &&
      this.state.selections.arriveDate !== "" &&
      this.state.selections.departDate !== "" &&
      endDateUnix > startDateUnix
    );
  };

  render() {
    return (
      <div className="App">
        {this.state.dataInvalid ? (
          <div
            id="blinder"
            onClick={() => {
              this.setState({ dataInvalid: false });
            }}
          >
            <h1> Please Check you input! </h1>
            <h2> Please check that the City Name is entered </h2>
            <h2> Please select a planned arrival date </h2>
            <h2> Please make sure that the planned departure date is after the arrival date </h2>
          </div>
        ) : (
          <div />
        )}
        <div className="app-name">
          <img className="app-name" src={logo_name} alt="the logo of EvenTrip" />
        </div>
        {/* <h1 className="app-name">Eventrip</h1> */}
        {!this.state.filtered ? (
          <form className="user-input" value="">
            <input id="cityName" type="text" placeholder="City" onChange={this.setCity}></input>
            <div className="two-column-div">
              <input
                id="arriveDate"
                type={this.state.datepicker.arriveDate}
                onFocus={e => {
                  this.handleDateField(e);
                }}
                onBlur={e => {
                  this.handleDateField(e);
                }}
                onChange={this.setArrival}
                className="date-pick"
                placeholder="Arrival Date"
              ></input>
              <input
                id="departDate"
                type={this.state.datepicker.departDate}
                onFocus={e => {
                  this.handleDateField(e);
                }}
                onBlur={e => {
                  this.handleDateField(e);
                }}
                onChange={this.setDeparture}
                // min={th}
                value={this.state.selections.departDate}
                className="date-pick"
                placeholder="Departure Date"
              ></input>
            </div>
            <div className="two-column-div">
              <input
                type="number"
                className="hotel-price"
                pattern="[0-9]*"
                min="0"
                max="9999"
                placeholder="Hotel Min Price $"
                onChange={this.setHotelMin}
              ></input>
              <input
                type="number"
                className="hotel-price"
                pattern="[0-9]*"
                min="0"
                max="9999"
                placeholder="Hotel Max Price"
                onChange={this.setHotelMax}
              ></input>
            </div>
            <input
              type="number"
              pattern="[0-9]*"
              min="0"
              max="9999"
              placeholder="Play Budget $"
              onChange={this.setBudget}
            ></input>

            <div className="two-column-div">
              <button
                className="form-button"
                onClick={e => {
                  this.handleSeachClicked(e);
                }}
              >
                {" "}
                SEARCH{" "}
              </button>
              <button
                className="form-button"
                onClick={e => {
                  this.handleBackOrCancel(e);
                }}
              >
                {" "}
                CLEAR{" "}
              </button>
            </div>
          </form>
        ) : (
          <div id="componentContainer">
            <form className="goHomeForm" value="">
              <button
                className="goHome"
                onClick={e => {
                  this.handleBackOrCancel(e);
                }}
              >
                {" "}
                GO BACK TO SEARCH{" "}
              </button>
            </form>
            <div>
              <Events
                cityName={this.state.selections.cityName}
                arriveDate={this.state.selections.arriveDate}
                departDate={this.state.selections.departDate}
                budget={this.state.selections.budget}
              />
              <Hotels
                cityName={this.state.selections.cityName}
                arrivalDate={this.state.selections.arriveDate}
                departureDate={this.state.selections.departDate}
                minPrice={this.state.selections.minPrice}
                maxPrice={this.state.selections.maxPrice}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
