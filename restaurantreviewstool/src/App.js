import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar.js';
import Logo from './components/Logo/Logo.js';
import SearchForm from './components/SearchForm/SearchForm.js';
import SearchFilter from './components/SearchFilter/SearchFilter.js';
import ReviewComponent from './components/ReviewComponent/ReviewComponent.js';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchfield: '', 
      searchresults: []
    }
    
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
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

  render(){
    return (
      <div className="App">
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
              component={() => <SearchFilter searchresults={this.state.searchresults} /> } 
            />  

            <ReviewComponent path='/reviewcomponent' component={ReviewComponent} /> {/* final restaurant details */}
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
