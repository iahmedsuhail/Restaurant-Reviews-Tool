import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar.js';
import Logo from './components/Logo/Logo.js';
import SearchForm from './components/SearchForm/SearchForm.js';
import SearchFilter from './components/SearchFilter/SearchFilter.js';
import ReviewComponent from './components/ReviewComponent/ReviewComponent.js';



class App extends React.Component {
  constructor(){
    super();
    /* state should probably go here */
    this.state = {
      route: ''
    }
  }
  render(){
    return (
      <div className="App">
        <BrowserRouter> {/* using react-router-dom for routing */}
          <NavigationBar />  {/* for navigation through the app, always rendered */}
          <Logo />   {/* a logo for the RestrauntReviewsTool */}
          <Switch>
            <Route path='/' exact component={SearchForm} />  {/* input field for search data */}
            <Route path='/searchfilter' component={SearchFilter} />  {/* where the user sees multiple options */}
            <ReviewComponent path='/reviewcomponent' component={ReviewComponent} /> {/* final restaurant details */}
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}


export default App;
