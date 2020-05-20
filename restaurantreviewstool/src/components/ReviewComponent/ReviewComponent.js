import React from 'react';
import Grid from '@material-ui/core/Grid';
import './ReviewComponent.css';
import axios from 'axios';

class ReviewComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gpName: '', 
            gpAddress: '', 
            gpPhone: '', 
            gpRating: '',
            gpUserReviews: [],
            google_place_ID: '',

            yelpName: '',
            yelpAddress: '',
            yelpPhone: '',
            yelpRating: '',
            yelp_place_ID: ''
        }
    }

    // Calls to all APIs should be made in this method
    UNSAFE_componentWillMount(){
        //Data passed on from the search form
        var googleID = this.props.google_place_ID;
        var yelpID = this.props.yelp_place_ID;
        var name = this.props.name;
        var address = this.props.address;
        var rating = this.props.rating;
        // Call for Details from Google Places API

        if(googleID !== undefined){
            fetch(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyB4O1O9YEnEd8WnQ3afnSHuvDpx7vsycMw&place_id=${googleID}&type=restaurant&fields=review,formatted_address,formatted_phone_number,name,rating`)
            .then(response=> response.json())
            .then(data => {
                this.setState({ 
                    gpName: data.result.name, 
                    gpAddress: data.result.formatted_address, 
                    gpPhone: data.result.formatted_phone_number, 
                    gpRating: data.result.rating,
                    gpUserReviews: data.result.reviews
                })}).catch(err => "No google Id provided");
        } 
        else if(yelpID !== undefined){
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${yelpID}`, { 
                headers : {
                Authorization : `Bearer RCxaGe1TDhf1kSiIKQW9Wb9eBfhYtANwDCmKKAO5SdGMYXKQQCXu5LamK9eM8fNZp27OvCZZYjNDGVn2bucWGULytCmdxFZgXah6mB2cAl161Gj14qy_MV4R-MC0XnYx`,
                'X-Requested-With': 'XMLHttpRequest',
                }
        }).then(response => {
                    this.setState({
                        yelpName: response.data.name,
                        yelpAddress: response.data.location.display_address,
                        yelpPhone: response.data.display_phone,
                        yelpRating: response.data.rating
                        })
            }).catch(err => "No yelp Id provided");
    }
}

    render() {
            if(this.state.gpName !== ''){
            return (
                <div className="App">
                    <GoogleReviewCard gpName={this.state.gpName} 
                        gpPhone={this.state.gpPhone}
                        gpAddress={this.state.gpAddress}
                        gpRating={this.state.gpRating}
                        gpUserReviews={this.state.gpUserReviews} />
                </div>);
            } else if(this.state.yelpName !== ''){
                return (
                    <div className="App">
                        <YelpReviewCard yelpName={this.state.yelpName} 
                            yelpPhone={this.state.yelpPhone}
                            yelpAddress={this.state.yelpAddress}
                            yelpRating={this.state.yelpRating}/>
                    </div>);
            } else {
                return (<div className="App"></div>);
            }
        {/* Display components here, that you create below */}
    }
}

// Create ___ReviewCard components that display results from each API as a card
const YelpReviewCard = ({yelpName, yelpPhone, yelpAddress, yelpRating}) =>{
    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <div className="tc review-component br3 pa3 ma2 dib bw2 shadow-5 sunflower-light">
                    <h1>
                        Yelp Review:
                    </h1>
                    <h3>
                        Name: {yelpName} <br />
                        Phone: {yelpPhone} <br />
                        Address: {yelpAddress} <br />
                        Rating: {yelpRating} <br />
                    </h3>
                </div>
            </Grid>
        </div>
    );
}
const GoogleReviewCard = ({gpName, gpPhone, gpAddress, gpRating, gpUserReviews}) =>{
    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <div className="tc review-component  br3 pa3 ma2 dib bw2 shadow-5 sunflower-light mw-75 w-75">
                    <h1>
                        Google Review:
                    </h1>
                    <h3>
                        Name: {gpName} <br />
                        Phone: {gpPhone} <br />
                        Address: {gpAddress} <br />
                        Rating: {gpRating} <br />
                        Individual Reviews: <br />
                    </h3>
                     <div class = "reviewBox">
                        {gpUserReviews.map((re, i) => {
                           return <h3 class = "review">
                            {gpUserReviews[i].rating}/5 -  {gpUserReviews[i].text} <br />
                           </h3>
                        })}
                     </div>
                </div>

            </Grid>
        </div>
    );
}

export default ReviewComponent;