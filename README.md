# EvenTrip

![Logo](src/assets/logo_name_black.png?raw=true)

EvenTrip is an app that provides an easy way for you to come up with ideas for your trip to anywhere! The app will give you events that you can visit during your stay in a specific city, and also hotels for all budgets with links to the booking website. The purpose is to find a fun event in a new city that you wouldn't see normally, and make the planning process easier!

## How to Use the App

[![Screenshot-2019-11-22-at-16-13-55.png](https://i.postimg.cc/vmtRX371/Screenshot-2019-11-22-at-16-13-55.png)](https://postimg.cc/WDzf1mHj)

When the home screen pops up, you can input the name of the city, your arrival and departure dates, and the minimum and maximum prices for your hotel budget. When you input arrival date, the departure date will default to 1 day later, but you are free to input what you want. City and date inputs are required, and you will get a screen that tells you to input them if they are not. Otherwise, when you are ready, you can click "SEARCH" and you will get a screen showing the events and hotels that can be visited. To go back to the home screen, click the logo.

## Available Scripts

In the project directory, you can run:

### `yarn`

Installs dependencies written in `package.json` file.

***PRODUCTION Build***
### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
Your app is ready to be deployed!

### `yarn start`

Runs the app server without hot-reloading.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

***DEVELOPMENT Build***
### `yarn dev`

Builds the app for development.<br />
Hot-reloading enabled.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Proxy is setup to connect to the back-end server running with the below command.

### `yarn serve`

Runs the app server in DEVELOPMENT mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
Hot-reloading enabled.

The page will reload if you make edits.<br />

## Technologies
[![Screenshot-2019-11-22-at-15-00-12.png](https://i.postimg.cc/KzJGH95p/Screenshot-2019-11-22-at-15-00-12.png)](https://postimg.cc/cgtGKB2f)
[![Screenshot-2019-11-22-at-15-00-20.png](https://i.postimg.cc/k41Cc2nk/Screenshot-2019-11-22-at-15-00-20.png)](https://postimg.cc/1nqbR5VH)

Rakuten RapidAPI was to find  all 5 APIs. Ticketmaster and Eventful were used for the components in React that rendered events, while Booking.com was used for the hotels component. Currency Converter and REST Countries APIs were used when converting a city's country code to currency and converting to a different currency for countries outside the U.S.

## Future Features

We hope to use more event APIs such as Meetup and Tripadvisor to diversify the events and attractions listed. It would also be more useful for users if they could see their search history, save or send an email of the page, adding Google Maps and restaurants, and filtering searches by event categories. More snapshots of events, food, and hotel amenities would also be nice.

## Deployment

Please use this link access our deployed version: http://eventrip.herokuapp.com/

## Acknowledgements

We would like to thank Rakuten RapidAPI for the opportunity to create this project and provide us with a variety of APIs!
