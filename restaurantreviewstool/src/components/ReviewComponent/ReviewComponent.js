import React from 'react';
import Grid from '@material-ui/core/Grid';
import './ReviewComponent.css';

class ReviewComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gpName: '', 
            gpAddress: '', 
            gpPhone: '', 
            gpRating: ''
        }
    }

    // Calls to all APIs should be made in this method
    UNSAFE_componentWillMount(){
        // Call for Details from Google Places API
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyB4O1O9YEnEd8WnQ3afnSHuvDpx7vsycMw&place_id=${this.props.placeDetailsID}&type=restaurant&fields=formatted_address,formatted_phone_number,name,rating`)
        .then(response=> response.json())
        .then(data => {
            this.setState({ 
                gpName: data.result.name, 
                gpAddress: data.result.formatted_address, 
                gpPhone: data.result.formatted_phone_number, 
                gpRating: data.result.rating
            })})
    }

    render(){
        return(
            <div>
                <GoogleReviewCard gpName={this.state.gpName} 
                    gpPhone={this.state.gpPhone}
                    gpAddress={this.state.gpAddress}
                    gpRating={this.state.gpRating} />
                
                {/* Display components here, that you create below */}
            </div>
        );
    }
}

// Create ___ReviewCard components that display results from each API as a card

const GoogleReviewCard = ({gpName, gpPhone, gpAddress, gpRating}) =>{
    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <div className="tc review-component br3 pa3 ma2 dib bw2 shadow-5 sunflower-light">
                    <h1>
                        Google Reviews on the restaurant...
                    </h1>
                    <h3>
                        Name: {gpName} <br />
                        Phone: {gpPhone} <br />
                        Address: {gpAddress} <br />
                        Rating: {gpRating} <br />
                    </h3>
                </div>
            </Grid>
        </div>
    );
}

export default ReviewComponent;