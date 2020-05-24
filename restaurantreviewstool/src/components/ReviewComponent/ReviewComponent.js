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
            gpPrice: '',
            gpPhotoReference: '',
            gpImage: '',
            gpWebsite: '',
            google_place_ID: '',
            googleCompareID: '',

            yelpName: '',
            yelpAddress: '',
            yelpPhone: '',
            yelpWebsite: '',
            yelpImage: '',
            yelpRating: '',
            yelpUserReviews: [],
            yelp_place_ID: '',
            yelpPrice: '',
            yelpCompareID: '',

            zomatoName: '',
            zomatoAddress: '', 
            zomatoRating: '', 
            zomatoPriceRange: '',
            zomatoWebsite: '',
            zomatoImage: '',
            zomatoUserReviews: [],
            zomato_place_ID: '',
            zomatoCompareID: ''
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
            fetch(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyB4O1O9YEnEd8WnQ3afnSHuvDpx7vsycMw&place_id=${googleID}&type=restaurant&fields=photo,review,formatted_address,formatted_phone_number,name,rating,price_level,website`, {
            mode: 'cors'
            })
            .then(response=> response.json())
            .then(data => {
                this.setState({
                    gpName: data.result.name,
                    gpAddress: data.result.formatted_address,
                    gpPhone: data.result.formatted_phone_number,
                    gpRating: data.result.rating,
                    gpPrice: data.result.price_level,
                    gpWebsite: data.result.website,
                    gpUserReviews: data.result.reviews,
                    googleCompareID: googleID,
                    gpPhotoReference: data.result.photos[0].photo_reference
                },function() {
                     if (this.state.gpPhotoReference !== '') {
                              //Get Image jpg
                              fetch(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.state.gpPhotoReference}&key=AIzaSyB4O1O9YEnEd8WnQ3afnSHuvDpx7vsycMw`, {
                              mode: 'cors'
                              }).then(response => response.blob())
                              .then(data => {
                                      this.setState({
                                        gpImage: URL.createObjectURL(data)
                              })}).catch(err => "No google photo provided");
                          console.log(this.state.gpPhotoReference);
                          console.log(this.state.gpImage);
                      }
                })});}
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
                        yelpPrice: response.data.price,
                        yelpCompareID: yelpID,
                        yelpImage: response.data.image_url
                    })}).catch(err => "No yelp Id provided");

        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${yelpID}/reviews`, {
                        headers : {
                        Authorization : `Bearer RCxaGe1TDhf1kSiIKQW9Wb9eBfhYtANwDCmKKAO5SdGMYXKQQCXu5LamK9eM8fNZp27OvCZZYjNDGVn2bucWGULytCmdxFZgXah6mB2cAl161Gj14qy_MV4R-MC0XnYx`,
                        'X-Requested-With': 'XMLHttpRequest',
                        }
        }).then(response => {
                    this.setState({
                        yelpUserReviews: response.data.reviews
                        })
            }).catch(err => "No yelp Id provided");
        }

        else if(zomatoID !== undefined){

            fetch(`${'https://cors-anywhere.herokuapp.com/'}https://developers.zomato.com/api/v2.1/restaurant?res_id=${zomatoID}`, {
                mode: 'cors',
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

                    zomatoImage: data.photos[0].photo.url,
                    zomatoCompareID: zomatoID
                })})
            .catch(err => "No zomato Id provided");

            fetch(`${'https://cors-anywhere.herokuapp.com/'}https://developers.zomato.com/api/v2.1/reviews?res_id=${zomatoID}`, {
                mode: 'cors',
                headers: {
                    Accept: "application/json",
                    "User-Key": "84d624178d6b4c6219f90cd5634fd956"
                }
            }).then(response => response.json()).then(data => {
                this.setState({
                    zomatoUserReviews: data.user_reviews
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
                        gpPrice={this.state.gpPrice}
                        gpRating={this.state.gpRating}
                        gpWebsite={this.state.gpWebsite}
                        gpUserReviews={this.state.gpUserReviews}
                        gpImage={this.state.gpImage}
                        googleCompareID={this.state.googleCompareID}
                        onAddToCompareClick={this.props.onAddToCompareClick}
                         />
                </div>);
            } else if(this.state.yelpName !== ''){
                return (
                    <div className="App">
                        <YelpReviewCard yelpName={this.state.yelpName} 
                            yelpPhone={this.state.yelpPhone}
                            yelpAddress={this.state.yelpAddress}
                            yelpWebsite={this.state.yelpWebsite}
                            yelpRating={this.state.yelpRating}
                            yelpImage={this.state.yelpImage}
                            yelpUserReviews={this.state.yelpUserReviews}
                            yelpPrice={this.state.yelpPrice}
                            yelpCompareID={this.state.yelpCompareID}
                            onAddToCompareClick={this.props.onAddToCompareClick}/>
                    </div>);
            } else if(this.state.zomatoName !== ''){
                return (
                    <div className="App">
                        <ZomatoReviewCard zomatoName={this.state.zomatoName}
                            zomatoAddress={this.state.zomatoAddress}
                            zomatoWebsite={this.state.zomatoWebsite}
                            zomatoPriceRange={this.state.zomatoPriceRange}
                            zomatoUserReviews={this.state.zomatoUserReviews}
                            zomatoRating={this.state.zomatoRating}
                            zomatoImage={this.state.zomatoImage}
                            zomatoCompareID={this.state.zomatoCompareID}
                            onAddToCompareClick={this.props.onAddToCompareClick}/>
                    </div>);
            } else {
                return (<div className="App"></div>);
            }
    }
}

// Create ___ReviewCard components that display results from each API as a card
const YelpReviewCard = ({yelpName, yelpPhone, yelpAddress, yelpWebsite, yelpPrice, yelpRating, yelpUserReviews, yelpImage, yelpCompareID, onAddToCompareClick}) =>{
    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <button className='grow f4 ph3 pv2 dib white bg-light-purple' onClick={()=> onAddToCompareClick("yelp",yelpCompareID)}>
                            Add to Compare     
                </button>
                <div className="tc review-component  br3 pa3 ma2 dib bw2 shadow-5 sunflower-light mw-75 w-75">
                    <h1>
                        Yelp Review:
                    </h1>
                    <img src={yelpImage} alt=""></img>
                    <h3>
                        Name: {yelpName} <br />
                        Phone: {yelpPhone} <br />
                        Address: {yelpAddress} <br />
                        Webpage:<br/><a href= {yelpWebsite}>Link</a><br/>
                        Price: {yelpPrice} <br />
                        Rating: {yelpRating} <br />
                        Individual Reviews: <br />
                        <hr/>
                    </h3>
                    <div className = "reviewBox">
                        {yelpUserReviews.map((re, i) => {
     
                        return <h3 key={i.toString()} className = "review">
                            {yelpUserReviews[i].rating}/5 -  {yelpUserReviews[i].text} <br />
                           </h3>
                        })}
                     </div>
                </div>
            </Grid>
        </div>
    );
}
const GoogleReviewCard = ({gpName, gpPhone, gpAddress, gpPrice, gpRating, gpWebsite, gpUserReviews,gpImage, googleCompareID, onAddToCompareClick}) =>{
    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
            <button className='grow f4 ph3 pv2 dib white bg-light-purple' onClick={()=> onAddToCompareClick("google reviews",googleCompareID)}>
                            Add to Compare     
                </button>
                <div className="tc review-component  br3 pa3 ma2 dib bw2 shadow-5 sunflower-light mw-75 w-75">
                    <h1>
                        Google Review:
                    </h1>
                    <img src={gpImage} alt=""></img>
                    <h3>
                        Name: {gpName} <br />
                        Phone: {gpPhone} <br />
                        Address: {gpAddress} <br />
                        Webpage:<br/><a href={gpWebsite}>Link</a> <br/>
                        Price: {gpPrice} <br/>
                        Rating: {gpRating} <br />
                        Individual Reviews: <br />
                    </h3>
                     <div className = "reviewBox">
                        {gpUserReviews.map((re, i) => {
                        return <h3 key={i.toString()} className = "review">
                            {gpUserReviews[i].rating}/5 -  {gpUserReviews[i].text} <br />
                           </h3>
                        })}
                     </div>
                </div>
            </Grid>
        </div>
    );
}

const ZomatoReviewCard = ({zomatoName, zomatoPriceRange, zomatoImage, zomatoWebsite, zomatoAddress, zomatoRating, zomatoUserReviews, zomatoCompareID, onAddToCompareClick}) =>{
    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
            <button className='grow f4 ph3 pv2 dib white bg-light-purple' onClick={()=> onAddToCompareClick("zomato",zomatoCompareID)}>
                            Add to Compare     
            </button>
                <div className="tc review-component  br3 pa3 ma2 dib bw2 shadow-5 sunflower-light mw-75 w-75">
                    <h1>
                        Zomato Review
                    </h1>
                    <img className="mw-75 w-75" alt="" src={zomatoImage}></img>                    <h3>
                        Name: {zomatoName} <br />
                        Address: {zomatoAddress} <br />
                        Webpage:<br/><a href={zomatoWebsite}>Link</a><br />
                        Price: {zomatoPriceRange} <br/>
                        Rating: {zomatoRating} <br />
                        Individual Reviews: <br />
                    </h3>
                     <div className = "reviewBox">
                        {zomatoUserReviews.map((re, i) => {
                        return <h3 key={i.toString()} className = "review">
                            {zomatoUserReviews[i].review.rating}/5 -  {zomatoUserReviews[i].review.review_text} <br />
                           </h3>
                        })}

                     </div>
                </div>
            </Grid>
        </div>
    );
}

export default ReviewComponent;