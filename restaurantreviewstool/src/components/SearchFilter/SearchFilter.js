import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

class SearchFilter extends React.Component{

    render(){
        return(
            <div className="App">
                <h1>SEARCH RESULTS</h1>
                {this.props.searchresults.map((re, i) => {
                    return(<SearchCard 
                        key={i} 
                        name={this.props.searchresults[i].name} 
                        address={this.props.searchresults[i].formatted_address} 
                        rating={this.props.searchresults[i].rating}
                        place_id={this.props.searchresults[i].place_id} 
                        onSearchCardClick = {this.props.onSearchCardClick}  
                    />);})}
            </div>
        );
    }
}

// The component below is populated from the results from the map and displayed above.
const SearchCard = ({name, address, rating, place_id, onSearchCardClick}) => {
    return(
        <Grid container direction="column" justify="center" alignItems="center">
            <Link to='/reviewcomponent'>
                <div className='tc bg-light-green br3 pa3 ma2 dib bw2 shadow-5' onClick={() => onSearchCardClick(name, place_id)}>
                        <h2>Name: {name}</h2>
                        <h5>Address: {address}</h5>
                        <h5>Rating: {rating}</h5>
                        <h5>Place ID: {place_id} </h5>
                </div>
            </Link>  
        </Grid> 
    );
}


export default SearchFilter;