import React from 'react';
import {Link} from 'react-router-dom';
import './SearchFilter.css';

const SearchCard = ({source, name, address, rating, google_id, yelp_id, zomato_id, onSearchCardClick}) => {
    return(
            <Link to='/reviewcomponent'>
                <div className='tc grow search-filter br3 pa4 ma2 dib bw2 shadow-5 sunflower-light' 
                    onClick={() => onSearchCardClick(name, google_id, yelp_id, zomato_id)} >
                        <h2>{source}</h2>
                        <h3>Name: {name}</h3>
                        <h5>Address: {address}</h5>
                        <h5>Rating: {rating}</h5>
                </div>
            </Link>  
    );
}

export default SearchCard;