import React from 'react';
import Grid from '@material-ui/core/Grid';

const SearchFilter = ({ searchresults }) => {
    return(
        <div>
            <h1>SEARCH RESULTS</h1>
            {searchresults.map((re, i) => {
                return(<SearchCard 
                    key={i} 
                    name={searchresults[i].name} 
                    address={searchresults[i].formatted_address} 
                    rating={searchresults[i].rating} 
                    
                />);})}
        </div>
    );
}


// The component below is populated from the results from the map and displayed above.

const SearchCard = ({name, address, rating}) => {
    return(
        <Grid container direction="column" justify="center" alignItems="center">
            <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
                    <h2>Name: {name}</h2>
                    <h5>Address: {address}</h5>
                    <h5>Rating: {rating}</h5>
            </div>  
        </Grid> 
    );
}

export default SearchFilter;