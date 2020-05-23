import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar.js';
import SearchForm from './components/SearchForm/SearchForm.js';
import SearchFilter from './components/SearchFilter/SearchFilter.js';
import ReviewComponent from './components/ReviewComponent/ReviewComponent.js';
import Particles from 'react-particles-js';
import axios from 'axios';

const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchfield: '', 
      yelpSearchresults: [],
      googleSearchresults: [],
      placeDetailsName: '', 
      googleReviewID: '',
      yelpReviewID: '', 
      zomatoSearchresults: [], 
      zomatoReviewID: '',
      latitude: -36.848461,
      longitude: 174.763336,
      userCity: "Auckland"
    }
    
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);

    this.onSearchCardClick = this.onSearchCardClick.bind(this);

    this.getCity = this.getCity.bind(this);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCity);
    }
  }

  onInputChange(event) {
    this.setState({searchfield: event.target.value});

  }

  onSearchClick() {
    fetch(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.searchfield}&location=${this.state.latitude},${this.state.longitude}&radius=10000&key=AIzaSyB4O1O9YEnEd8WnQ3afnSHuvDpx7vsycMw&type=restaurant`)
      .then(response=> response.json())
      .then(data => {this.setState({ googleSearchresults: data.results})})
      .then(results => {console.log(this.state.googleSearchresults.length + " results returned from google (logged in state update)")});

    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=${this.state.searchfield}`, { 
      headers : {
        Authorization : `Bearer RCxaGe1TDhf1kSiIKQW9Wb9eBfhYtANwDCmKKAO5SdGMYXKQQCXu5LamK9eM8fNZp27OvCZZYjNDGVn2bucWGULytCmdxFZgXah6mB2cAl161Gj14qy_MV4R-MC0XnYx`,
        'X-Requested-With': 'XMLHttpRequest'
    },
    params: {
      location: this.state.userCity,
      categories: "restaurant"
    }})
      .then(response => {this.setState({yelpSearchresults: response.data.businesses});
            console.log(response.data.total + " results returned from yelp");})
      .catch(err => {console.log("Error in Yelp Api Call" + err)});
    
      
    fetch(`${'https://cors-anywhere.herokuapp.com/'}https://developers.zomato.com/api/v2.1/search?q=${this.state.searchfield}&count=10&lat=${this.state.latitude}&lon=${this.state.longitude}&radius=100000`, {
      headers: {
      Accept: "application/json",
      "User-Key": "84d624178d6b4c6219f90cd5634fd956"
      }
    }).then(response => response.json())
    .then(data => {this.setState({ zomatoSearchresults: data.restaurants})})
    .then(results => {console.log(this.state.zomatoSearchresults)});
  }

  getCity(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    
    fetch(`https://geocode.xyz/${this.state.latitude},${this.state.longitude}?json=1`)
      .then(response => response.json())
      .then(data => {this.setState({userCity: data.city})})
      .then(console.log);
  }

  onSearchCardClick(name, google_id, yelp_id, zomato_id){
    this.setState({placeDetailsName: name, 
      googleReviewID: google_id, 
      yelpReviewID: yelp_id,
      zomatoReviewID: zomato_id
    });
  }


  render(){
    return (
      // Particles.js library for styling the application
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}/> 
        <BrowserRouter> {/* using react-router-dom for routing */}
          <NavigationBar />  {/* for navigation through the app, always rendered */}
          <Switch>
            <Route path='/' 
              exact 
              render={(props) => <SearchForm {...props} searchfield={this.state.searchfield} onInputChange={this.onInputChange} onSearchClick={this.onSearchClick} /> } 
            /> 
            {/* Changing to render so the component wont re-render everytime key is pressed */}

            <Route 
              path='/searchfilter' 

              render={(props) => <SearchFilter {...props}
                                  googleSearchresults={this.state.googleSearchresults}
                                  yelpSearchresults={this.state.yelpSearchresults}
                                  zomatoSearchresults={this.state.zomatoSearchresults}
                                  onSearchCardClick={this.onSearchCardClick}/> } 
            />  

            <Route 
              path='/reviewcomponent' 
              render={(props) => <ReviewComponent {...props} 
                                  google_place_ID={this.state.googleReviewID} 
                                  yelp_place_ID={this.state.yelpReviewID}
                                  zomato_place_ID={this.state.zomatoReviewID} />}
              /> 

          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
