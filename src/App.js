import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar.js";
import SearchForm from "./components/SearchForm/SearchForm.js";
import SearchFilter from "./components/SearchFilter/SearchFilter.js";
import ReviewComponent from "./components/ReviewComponent/ReviewComponent.js";
import CompareComponent from "./components/CompareComponent/CompareComponent.js";
import Popup from "./components/Popup.js";
import Particles from "react-particles-js";
import Logo from "./components/Logo/Logo";
import axios from "axios";
import {
  GOOGLE_PLACES_API_KEY,
  ZOMATO_PLACES_API_KEY,
  YELP_PLACES_API_KEY,
} from "./APIKeys";

const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield: "",
      yelpSearchresults: [],
      googleSearchresults: [],
      placeDetailsName: "",
      googleReviewID: "",
      yelpReviewID: "",
      zomatoSearchresults: [],
      zomatoReviewID: "",

      googleCompareId: "",
      zomatoCompareId: "",
      yelpCompareId: "",
      showPopup: false,
      latitude: -36.848461,
      longitude: 174.763336,
      userCity: "Auckland",
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);

    this.onSearchCardClick = this.onSearchCardClick.bind(this);
    this.onAddToCompareClick = this.onAddToCompareClick.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.getCity = this.getCity.bind(this);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCity);
    }
  }

  onInputChange(event) {
    this.setState({ searchfield: event.target.value });
  }

  onSearchClick() {
    fetch(
      `${"https://cors-anywhere.herokuapp.com/"}https://maps.googleapis.com/maps/api/place/textsearch/json?query=${
        this.state.searchfield
      }&location=${this.state.latitude},${
        this.state.longitude
      }&radius=10000&key=${GOOGLE_PLACES_API_KEY}&type=restaurant`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ googleSearchresults: data.results });
      })
      .then((results) => {
        console.log(
          this.state.googleSearchresults.length +
            " results returned from google (logged in state update)"
        );
      });

    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?term=${
          this.state.searchfield
        }&location=${this.state.userCity}`,
        {
          headers: {
            Authorization: `Bearer ${YELP_PLACES_API_KEY}`,
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      )
      .then((response) => {
        this.setState({ yelpSearchresults: response.data.businesses });
        console.log(response.data.total + " results returned from yelp");
      })
      .catch((err) => {
        console.log("Error in Yelp Api Call" + err);
      });

    fetch(
      `${"https://cors-anywhere.herokuapp.com/"}https://developers.zomato.com/api/v2.1/search?q=${
        this.state.searchfield
      }&count=10&lat=${this.state.latitude}&lon=${
        this.state.longitude
      }&radius=100000`,
      {
        headers: {
          Accept: "application/json",
          "User-Key": `${ZOMATO_PLACES_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ zomatoSearchresults: data.restaurants });
      })
      .then((results) => {
        console.log(this.state.zomatoSearchresults);
      });
  }

  getCity(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    fetch(
      `https://geocode.xyz/${this.state.latitude},${this.state.longitude}?json=1`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ userCity: data.city });
      })
      .then(console.log);
  }

  onSearchCardClick(name, google_id, yelp_id, zomato_id) {
    this.setState({
      placeDetailsName: name,
      googleReviewID: google_id,
      yelpReviewID: yelp_id,
      zomatoReviewID: zomato_id,
    });
  }

  onAddToCompareClick(source, id) {
    if (source === "yelp") {
      this.setState({ yelpCompareId: id });
      this.togglePopup();
    } else if (source === "google reviews") {
      this.setState({ googleCompareId: id });
      this.togglePopup();
    } else if (source === "zomato") {
      this.setState({ zomatoCompareId: id });
      this.togglePopup();
    }
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
      // Particles.js library for styling the application
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          {" "}
          {/* using react-router-dom for routing */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <NavigationBar />{" "}
            {/* for navigation through the app, always rendered */}
          </div>
          <Logo />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <SearchForm
                  {...props}
                  searchfield={this.state.searchfield}
                  onInputChange={this.onInputChange}
                  onSearchClick={this.onSearchClick}
                />
              )}
            />

            <Route
              path="/searchfilter"
              render={(props) => (
                <SearchFilter
                  {...props}
                  googleSearchresults={this.state.googleSearchresults}
                  yelpSearchresults={this.state.yelpSearchresults}
                  zomatoSearchresults={this.state.zomatoSearchresults}
                  onSearchCardClick={this.onSearchCardClick}
                />
              )}
            />

            <Route
              path="/reviewcomponent"
              render={(props) => (
                <ReviewComponent
                  {...props}
                  google_place_ID={this.state.googleReviewID}
                  yelp_place_ID={this.state.yelpReviewID}
                  zomato_place_ID={this.state.zomatoReviewID}
                  onAddToCompareClick={this.onAddToCompareClick}
                />
              )}
            />

            <Route
              path="/comparecomponent"
              render={(props) => (
                <CompareComponent
                  {...props}
                  yelpCompareId={this.state.yelpCompareId}
                  googleCompareId={this.state.googleCompareId}
                  zomatoCompareId={this.state.zomatoCompareId}
                />
              )}
            />
          </Switch>
        </BrowserRouter>

        {this.state.showPopup ? (
          <Popup closePopup={this.togglePopup.bind(this)} />
        ) : null}
      </div>
    );
  }
}

export default App;
