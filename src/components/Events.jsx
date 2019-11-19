import React, {Component} from 'react';
import axios from 'axios';
export default class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],

        }
    }

    componentDidMount() {
        //'2012042500-2012042700' api format
        // our app format YYYY-MM-DD

        const updatedDate = this.props.arrivalDate.split('-').join('') + '00';

        axios.post('/api/events', {
            city: this.props.cityName,
            date: updatedDate
          })
          .then(function (response) {
              //return 
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render() {

        return (
            <div>Events</div>
        )
    }
}

//props
/*
cityName
arrivalDate 
departureDate
eventBudget
*/
