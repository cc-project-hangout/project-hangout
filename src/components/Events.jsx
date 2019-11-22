import React, { Component } from "react";
import axios from "axios";
import Event from "./Event.jsx";
import "./styles/Events.css";
export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventIndex: 0,
      loading: true,
    };
  }

  componentDidMount() {
    const arrivalDate = this.props.arriveDate.split("-").join("") + "00";
    const departureDate = this.props.departDate.split("-").join("") + "00";
    const totalDates = arrivalDate + "-" + departureDate;
    console.log(totalDates);
    axios
      .post("/api/events", {
        city: this.props.cityName,
        date: totalDates,
      })
      .then(response => {
        //if we get multiple objects, can just put them in an array
        console.log(response.data);
        this.setState({ events: response.data });
        this.setState({ loading: false });
        //console.log(response.data)
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  checkPreviousEvent = () => {
    if (this.state.eventIndex !== 0) {
      let newPrevIndex = this.state.eventIndex;
      newPrevIndex--;
      this.setState({ eventIndex: newPrevIndex });
    }

    console.log("ok");
  };

  checkNextEvent = () => {
    let newNextIndex = this.state.eventIndex;
    newNextIndex++;
    if (this.state.eventIndex !== this.state.events.length - 1) {
      this.setState({ eventIndex: newNextIndex });
    }
    console.log("ok");
  };

  render() {
    // if(this.state.loading === true) {
    //    // <img src="https://media1.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif"/>
    // }
    const events = this.state.events.map((event, index) => {
      return (
        <Event
          title={event.title}
          url={event.url}
          image={event.image}
          venue={event.venue}
          description={event.description}
          startTime={event.startTime}
          key={index}
        />
      );
    });

    return (
      <div id="eventContainer">
        <div className="leftArrow" onClick={this.checkPreviousEvent}>
          <img className="arrowImage" src="https://img.icons8.com/flat_round/64/000000/arrow-left.png" />
        </div>
        <div className="events">{events[this.state.eventIndex]}</div>
        <div className="rightArrow" onClick={this.checkNextEvent}>
          <img className="arrowImage" src="https://img.icons8.com/flat_round/64/000000/arrow-right.png" />
        </div>
      </div>
    );
  }
}

//props
/*
cityName
arrivalDate
departureDate
eventBudget
*/
