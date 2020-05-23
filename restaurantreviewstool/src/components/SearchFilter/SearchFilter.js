import React from 'react';
import {Link} from 'react-router-dom';
import './SearchFilter.css';
import { Grid } from '@material-ui/core';
class SearchFilter extends React.Component{

    render(){
        return(
            <div className="App">
                <h1 className="sunflower-medium">SEARCH RESULTS</h1>
                {/* <div style={{overflow: 'scroll', height: '700px'}}> */}
                <div style={{'display' : 'flex', 'flexDirection' : 'coloumn'}}>
                <Grid container direction="column">
                <Grid style={{'grid-column': '1/3'}} >
                <h2>Yelp</h2>                {this.props.yelpSearchresults.map((re,i) => {  
                return (<SearchCard
                            key={i}
                            source="yelp reviews"
                            name={this.props.yelpSearchresults[i].name}
                            address={this.props.yelpSearchresults[i].location.display_address}
                            rating={this.props.yelpSearchresults[i].rating}
                            yelp_id={this.props.yelpSearchresults[i].id ?? ""}
                            onSearchCardClick = {this.props.onSearchCardClick}
                            />);
              
                })}</Grid>
                </Grid>
                <Grid container direction="column">
                <Grid style={{'grid-column': '1/3'}}>
                <h2>Google</h2>    
                {this.props.googleSearchresults.map((re, i) => {
                    return(<SearchCard 
                        key={i} 
                        source="google reviews"
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
                <Grid style={{'grid-column': '1/3'}}>
                <h2>Zomato</h2>
                {this.props.zomatoSearchresults.map((re, i) => {
                    return(<SearchCard 
                        key={i} 
                        source="Zomato"
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

const SearchCard = ({source, name, address, rating, google_id, yelp_id, zomato_id, onSearchCardClick}) => {
    return(
            <Link to='/reviewcomponent'>
                <div className='tc grow search-filter br3 pa4 ma2 dib bw2 shadow-5 sunflower-light' 
                    onClick={() => onSearchCardClick(name, google_id, yelp_id, zomato_id)} >
                        <h1>{source}</h1>
                        <h2 >Name: {name}</h2>
                        <h5>Address: {address}</h5>
                        <h5>Rating: {rating}</h5>
                </div>
            </Link>  
    );
}

export default SearchFilter;