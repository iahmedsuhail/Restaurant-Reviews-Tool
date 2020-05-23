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
            gpWebsite: '',
            google_place_ID: '',

            yelpName: '',
            yelpAddress: '',
            yelpPhone: '',
            yelpWebsite: '',
            yelpRating: '',
            yelp_place_ID: '',
            yelpPrice: '',

            zomatoName: '',
            zomatoAddress: '', 
            zomatoRating: '', 
            zomatoPriceRange: '',
            zomatoWebsite: '',
            zomato_place_ID: ''
        }
    }

    // Calls to all APIs should be made in this method
    UNSAFE_componentWillMount(){
        //Data passed on from the search form
        var googleID = this.props.google_place_ID;
        var yelpID = this.props.yelp_place_ID;
        var zomatoID = this.props.zomato_place_ID;
        // var name = this.props.name;
        // var address = this.props.address;
        // var rating = this.props.rating;
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
                    gpUserReviews: data.result.reviews,
                    gpWebsite: data.result.website
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
                        yelpWebsite: response.data.url,
                        yelpRating: response.data.rating,
                        yelpPrice: response.data.price
                        })
            }).catch(err => "No yelp Id provided");
        }


        else if(zomatoID !== undefined){
            fetch(`${'https://cors-anywhere.herokuapp.com/'}https://developers.zomato.com/api/v2.1/restaurant?res_id=${zomatoID}`, {
                headers: {
                    Accept: "application/json",
                    "User-Key": "84d624178d6b4c6219f90cd5634fd956"
                }
            }).then(response => response.json())
            .then(data => {
                this.setState({ 
                    zomatoName: data.name, 
                    zomatoAddress: data.location.address,  
                    zomatoPriceRange: data.price_range,
                    zomatoWebsite: data.url,
                    zomatoRating: data.user_rating.aggregate_rating,
                })})
            .catch(err => "No zomato Id provided");
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
                        gpWebsite={this.state.gpWebsite}
                        gpUserReviews={this.state.gpUserReviews} />
                </div>);
            } else if(this.state.yelpName !== ''){
                return (
                    <div className="App">
                        <YelpReviewCard yelpName={this.state.yelpName} 
                            yelpPhone={this.state.yelpPhone}
                            yelpAddress={this.state.yelpAddress}
                            yelpWebsite={this.state.yelpWebsite}
                            yelpRating={this.state.yelpRating}
                            yelpPrice={this.state.yelpPrice}/>
                    </div>);
            } else if(this.state.zomatoName !== ''){
                return (
                    <div className="App">
                        <ZomatoReviewCard zomatoName={this.state.zomatoName}
                            zomatoAddress={this.state.zomatoAddress}
                            zomatoWebsite={this.state.zomatoWebsite}
                            zomatoPriceRange={this.state.zomatoPriceRange}
                            zomatoRating={this.state.zomatoRating}/>
                    </div>);
            } else {
                return (<div className="App"></div>);
            }
        {/* Display components here, that you create below */}
    }
}

// Create ___ReviewCard components that display results from each API as a card
const YelpReviewCard = ({yelpName, yelpPhone, yelpAddress, yelpWebsite, yelpPrice, yelpRating}) =>{
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
                        Webpage:<br/><a href= {yelpWebsite}>Yelp: {yelpName}</a><br/>
                        Price: {yelpPrice} <br />
                        Rating: {yelpRating} <br />
                        <hr/>
                    </h3>
                </div>
            </Grid>
        </div>
    );
}
const GoogleReviewCard = ({gpName, gpPhone, gpAddress, gpRating, gpWebsite, gpUserReviews}) =>{
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
                        Webpage:<br/><a href={gpWebsite}>Google Revviews: {gpName}</a> <br/>
                        Price: <br/>
                        Rating: {gpRating} <br />
                        Individual Reviews: <br />
                    </h3>
                     <div className = "reviewBox">
                        {gpUserReviews.map((re, i) => {
                           return <h3 className = "review">
                            {gpUserReviews[i].rating}/5 -  {gpUserReviews[i].text} <br />
                           </h3>
                        })}
                     </div>
                </div>
            </Grid>
        </div>
    );
}

const ZomatoReviewCard = ({zomatoName, zomatoPriceRange, zomatoWebsite, zomatoAddress, zomatoRating}) =>{
    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <div className="tc review-component br3 pa3 ma2 dib bw2 shadow-5 sunflower-light">
                    <h1>
                        Zomato Review
                    </h1>
                    <h3>
                        Name: {zomatoName} <br />
                        Address: {zomatoAddress} <br />
                        Webpage:<br/><a href={zomatoWebsite}>Zomato: {zomatoName}</a><br />
                        Price: {zomatoPriceRange} <br/>
                        Rating: {zomatoRating} <br />
                    </h3>
                </div>
            </Grid>
        </div>
    );
}

export default ReviewComponent;