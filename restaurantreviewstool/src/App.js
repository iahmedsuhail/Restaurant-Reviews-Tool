import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar.js';
import Logo from './components/Logo/Logo.js';
import SearchForm from './components/SearchForm/SearchForm.js';
import SearchFilter from './components/SearchFilter/SearchFilter.js';
import ReviewComponent from './components/ReviewComponent/ReviewComponent.js';
import Particles from 'react-particles-js';

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
      searchresults: [], 
      placeDetailsName: '', 
      placeDetailsID: ''

    }
    
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);

    this.onSearchCardClick = this.onSearchCardClick.bind(this);


  }

  onInputChange(event) {
    this.setState({searchfield: event.target.value});

  }

  onSearchClick() {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.searchfield}&key=AIzaSyB4O1O9YEnEd8WnQ3afnSHuvDpx7vsycMw&type=restaurant`)
      .then(response=> response.json())
      .then(data => {this.setState({ searchresults: data.results})})
      .then(results => {console.log(this.state.searchresults.length + " results returned from google (logged in state update)")});
  }

  onSearchCardClick(name, place_id){
    this.setState({placeDetailsName: name, placeDetailsID: place_id});
  }


  render(){
    return (
      // Particles.js library for styling the application
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        /> 
        <BrowserRouter> {/* using react-router-dom for routing */}
          <NavigationBar />  {/* for navigation through the app, always rendered */}
          <Logo />   {/* a logo for the RestrauntReviewsTool */}
          <Switch>
            <Route path='/' 
              exact 
              render={(props) => <SearchForm {...props} searchfield={this.state.searchfield} onInputChange={this.onInputChange} onSearchClick={this.onSearchClick} /> } 
            /> 
            {/* Changing to render so the component wont re-render everytime key is pressed */}

            <Route 
              path='/searchfilter' 

              render={(props) => <SearchFilter {...props}
                                  searchresults={this.state.searchresults} 
                                  onSearchCardClick={this.onSearchCardClick}/> } 
            />  

            <Route 
              path='/reviewcomponent' 
              render={(props) => <ReviewComponent {...props} placeDetailsID={this.state.placeDetailsID}/>}
              /> 


          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
