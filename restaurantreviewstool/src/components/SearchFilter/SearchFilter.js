import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import './SearchFilter.css';

class SearchFilter extends React.Component{

    render(){
        return(
            <div className="App">
                <h1 className="sunflower-medium">SEARCH RESULTS</h1>
                <div style={{overflow: 'scroll', height: '400px'}}>
                {this.props.yelpSearchresults.map((re,i) => {  
                return (<SearchCard
                            key={i}
                            source="yelp reviews"
                            name={this.props.yelpSearchresults[i].name}
                            address={this.props.yelpSearchresults[i].location.display_address}
                            rating={this.props.yelpSearchresults[i].rating}
                            yelp_id={this.props.yelpSearchresults[i].id ?? ""}
                            onSearchCardClick = {this.props.onSearchCardClick}
                            />);
                })}    
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
                </div>
            </div>
        );
    }
}

const SearchCard = ({source, name, address, rating, google_id, yelp_id, onSearchCardClick}) => {
    return(
        <Grid container direction="column" justify="center" alignItems="center">
            <Link to='/reviewcomponent'>
                <div className='tc search-filter br3 pa3 ma2 dib bw2 shadow-5 sunflower-light' 
                    onClick={() => onSearchCardClick(name, google_id, yelp_id)} >
                        <h1>{source}</h1>
                        <h2 >Name: {name}</h2>
                        <h5>Address: {address}</h5>
                        <h5>Rating: {rating}</h5>
                </div>
            </Link>  
        </Grid> 
    );
}


export default SearchFilter;