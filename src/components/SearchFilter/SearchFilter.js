import React from 'react';
import './SearchFilter.css';
import { Grid } from '@material-ui/core';
import SearchCard from './SearchCard.js'


class SearchFilter extends React.Component{

    render(){
        return(
            <div className="App">
                <h1 className="sunflower-medium white">Search Results</h1>
                <div style={{'display' : 'flex', 'flexDirection' : 'coloumn'}}>
                <Grid container direction="column">
                <Grid style={{'gridColumn': '1/3'}} >
                <h2 className='sunflower-light white'>Yelp</h2>
                {this.props.yelpSearchresults.map((re,i) => {  
                return (<SearchCard
                            key={i}
                            name={this.props.yelpSearchresults[i].name}
                            address={this.props.yelpSearchresults[i].location.display_address}
                            rating={this.props.yelpSearchresults[i].rating}
                            yelp_id={this.props.yelpSearchresults[i].id ?? ""}
                            onSearchCardClick = {this.props.onSearchCardClick}
                            />);
              
                })}</Grid>
                </Grid>
                <Grid container direction="column">
                <Grid style={{'gridColumn': '1/3'}}>
                <h2 className='sunflower-light white'>Google</h2>    
                {this.props.googleSearchresults.map((re, i) => {
                    return(<SearchCard 
                        key={i}
                        name={this.props.googleSearchresults[i].name} 
                        address={this.props.googleSearchresults[i].formatted_address} 
                        rating={this.props.googleSearchresults[i].rating}
                        google_id={this.props.googleSearchresults[i].place_id ?? ""} 
                        onSearchCardClick = {this.props.onSearchCardClick}
                    />);
                })}
                
                </Grid>
                </Grid>
                <Grid container direction="column">
                <Grid style={{'gridColumn': '1/3'}}>
                <h2 className='sunflower-light white'>Zomato</h2>
                {this.props.zomatoSearchresults.map((re, i) => {
                    return(<SearchCard 
                        key={i}
                        name={this.props.zomatoSearchresults[i].restaurant.name}
                        address={this.props.zomatoSearchresults[i].restaurant.location.address}
                        rating={this.props.zomatoSearchresults[i].restaurant.user_rating.aggregate_rating}
                        zomato_id={this.props.zomatoSearchresults[i].restaurant.id ?? ""}
                        onSearchCardClick = {this.props.onSearchCardClick}    
                    />);
                })}
                </Grid>
                </Grid>
            </div>
        </div>
        );
    }
}

export default SearchFilter;