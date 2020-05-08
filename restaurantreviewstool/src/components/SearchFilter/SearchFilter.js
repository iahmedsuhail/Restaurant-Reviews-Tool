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
                    {this.props.googleSearchresults.map((re, i) => {
                        return(<SearchCard 
                            key={i} 
                            name={this.props.googleSearchresults[i].name} 
                            address={this.props.googleSearchresults[i].formatted_address} 
                            rating={this.props.googleSearchresults[i].rating}
                            place_id={this.props.googleSearchresults[i].place_id} 
                            onSearchCardClick = {this.props.onSearchCardClick}
                        />);
                    })}
                    {this.props.yelpSearchresults.map((re2,i2)=> {
                        return(<SearchCard
                            key={i2}
                            name={this.props.yelpSearchresults[i2].params.name}
                            address={this.props.yelpSearchresults[i2].location.address1 + ','  + this.props.yelpSearchresults[i2].location.city}
                            place_id={this.props.yelpSearchresults[i2].id}
                            onSearchCardClick = {this.props.onSearchCardClick}
                            />);
                        })}
                </div>
            </div>
        );
    }
}

const SearchCard = ({name, address, rating, place_id, onSearchCardClick}) => {
    return(
        <Grid container direction="column" justify="center" alignItems="center">
            <Link to='/reviewcomponent'>
                <div className='tc search-filter br3 pa3 ma2 dib bw2 shadow-5 sunflower-light' 
                    onClick={() => onSearchCardClick(name, place_id)} >
                        <h2 >Name: {name}</h2>
                        <h5>Address: {address}</h5>
                        <h5>Rating: {rating?? " "}</h5>
                </div>
            </Link>  
        </Grid> 
    );
}


export default SearchFilter;