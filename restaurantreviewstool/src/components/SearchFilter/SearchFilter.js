import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import './SearchFilter.css';

class SearchFilter extends React.Component{

    render(){
        return(
            <div>
                <h1 className="sunflower-medium">SEARCH RESULTS</h1>
                <div style={{ overflow: 'scroll', height: '400px'}}> 
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
            </div>
        );
    }
}

// The component below is populated from the results from the map and displayed above.
const SearchCard = ({name, address, rating, place_id, onSearchCardClick}) => {
    return(
        <Grid container direction="column" justify="center" alignItems="center">
            <Link to='/reviewcomponent'>
                <div className='tc search-filter br3 pa3 ma2 dib bw2 shadow-5 sunflower-light' 
                    onClick={() => onSearchCardClick(name, place_id)} >
                        <h2 >Name: {name}</h2>
                        <h5>Address: {address}</h5>
                        <h5>Rating: {rating}</h5>
                </div>
            </Link>  
        </Grid> 
    );
}


export default SearchFilter;