import React, {Component} from 'react';
import axios from 'axios';
import Event from './Event.jsx';
import './styles/Events.css'
export default class Events extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            events: [ 
                {
                title: 'Sickest event ever',
                image: 'https://en.es-static.us/upl/2018/12/comet-wirtanen-Jack-Fusco-dec-2018-Anza-Borrego-desert-CA-e1544613895713.jpg', 
                venue: 'Test Venue', 
                url: 'https://google.com', 
                description: 'This is a sick event', 
                startTime: '8:00'
                },
                {
                    title: 'Sickest event ever',
                    image: 'https://en.es-static.us/upl/2018/12/comet-wirtanen-Jack-Fusco-dec-2018-Anza-Borrego-desert-CA-e1544613895713.jpg', 
                    venue: 'Test Venue', 
                    url: 'https://google.com', 
                    description: 'This is a sick event', 
                    startTime: '8:00'
                    }
            
            ],


        }
    }

    componentDidMount() {
        //'2012042500-2012042700' api format
        // our app format YYYY-MM-DD

        // const updatedDate = this.props.arrivalDate.split('-').join('') + '00';

        // axios.post('/api/events', {
        //     city: this.props.cityName,
        //     date: updatedDate
        //   })
        //   .then(function (response) {
        //       //if we get multiple objects, can just put them in an array
        //     this.setState {events: response}
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }
    render() {    

        const events = this.state.events.map(event => {
           return  <Event title={event.title} url={event.url} image={event.image} venue={event.venue} description={event.description} startTime={event.startTime} />
        });

        return (
            <div id ="eventContainer">
                {events}
            </div>
            
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
