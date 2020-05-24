import React from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';

class CompareComponent extends React.Component{
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

            yelpName: '',
            yelpAddress: '',
            yelpPhone: '',
            yelpWebsite: '',
            yelpImage: '',
            yelpUserReviews: [],
            yelpRating: '',
            yelpPrice: '',

            zomatoName: '',
            zomatoAddress: '', 
            zomatoRating: '', 
            zomatoPriceRange: '',
            zomatoWebsite: '',
            zomatoImage: '',
            zomatoUserReviews: [],
        }
    }

    UNSAFE_componentWillMount(){
        var googleCompareId = this.props.googleCompareId;
        var yelpCompareId = this.props.yelpCompareId;
        var zomatoCompareId = this.props.zomatoCompareId;

            fetch(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyB4O1O9YEnEd8WnQ3afnSHuvDpx7vsycMw&place_id=${googleCompareId}&type=restaurant&fields=photo,review,formatted_address,formatted_phone_number,name,rating,price_level`, {
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
                        gpWebsite: data.result.reviews.author_url,
                        gpUserReviews: data.result.reviews,
                        gpPhotoReference: data.result.photos[0].photo_reference,
                    },function() {
                         if (this.state.gpPhotoReference !== '') {
                                  //Get Image jpg
                                  fetch(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.state.gpPhotoReference}&key=AIzaSyB4O1O9YEnEd8WnQ3afnSHuvDpx7vsycMw`, {
                                  mode: 'cors'
                                  }).then(response => response.blob())
                                  .then(data => {
                                          this.setState({
                                            gpImage: URL.createObjectURL(data)
                                  })}).catch(err => "No google photo provided");
                              console.log(this.state.gpPhotoReference);
                              console.log(this.state.gpImage);
                          }
                    }
                )}).catch(err => "No google Id provided");
                
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${yelpCompareId}`, { 
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
                        yelpImage: response.data.image_url
                        })
            }).catch(err => "No yelp Id provided");

        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${yelpCompareId}/reviews`, {
                        headers : {
                        Authorization : `Bearer RCxaGe1TDhf1kSiIKQW9Wb9eBfhYtANwDCmKKAO5SdGMYXKQQCXu5LamK9eM8fNZp27OvCZZYjNDGVn2bucWGULytCmdxFZgXah6mB2cAl161Gj14qy_MV4R-MC0XnYx`,
                        'X-Requested-With': 'XMLHttpRequest',
                        }
        }).then(response => {
                    this.setState({
                        yelpUserReviews: response.data.reviews
                        })
            }).catch(err => "No yelp Id provided");

            fetch(`${'https://cors-anywhere.herokuapp.com/'}https://developers.zomato.com/api/v2.1/restaurant?res_id=${zomatoCompareId}`, {
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
                })})
            .catch(err => "No zomato Id provided");

            fetch(`${'https://cors-anywhere.herokuapp.com/'}https://developers.zomato.com/api/v2.1/reviews?res_id=${zomatoCompareId}`, {
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

    render() {
        if(this.state.gpName === "" && this.state.yelpName === "" && this.state.zomatoName === ""){
            return(<div className="App">
                <h1 style={{'color' : 'red'}}>NO REVIEWS ADDED</h1>
                <h3 style={{'color' : 'red'}}>Please select 1 - 3 reviews for comparison, and access this page again</h3>
            </div>);
        }else {
            return (
                <div className="App">
                <h1 className="sunflower-medium">SELECTED REVIEWS</h1>
                <div style={{'display' : 'flex', 'flexDirection' : 'coloumn'}}>
                <Grid container direction="column">
                <Grid style={{'gridColumn': '1/3'}} >
                {this.state.gpName !== "" ?
                <div> 
                <h2>Google</h2>
                    <GoogleReviewCard gpName={this.state.gpName ?? ""} 
                        gpPhone={this.state.gpPhone ?? ""}
                        gpAddress={this.state.gpAddress ?? ""}
                        gpPrice={this.state.gpPrice ?? ""}
                        gpRating={this.state.gpRating ?? ""}
                        gpWebsite={this.state.gpWebsite ?? ""}
                        gpUserReviews={this.state.gpUserReviews ?? ""}
                        gpImage={this.state.gpImage ?? ""}
                         />
                 </div>
                : <div></div>}
                </Grid>
                </Grid>
                <Grid container direction="column">
                <Grid style={{'gridColumn': '1/3'}}>
                {this.state.yelpName !== "" ?
                <div> 
                <h2>Yelp</h2>    
                        <YelpReviewCard yelpName={this.state.yelpName ?? ""} 
                            yelpPhone={this.state.yelpPhone ?? ""}
                            yelpAddress={this.state.yelpAddress ?? ""}
                            yelpWebsite={this.state.yelpWebsite ?? ""}
                            yelpRating={this.state.yelpRating ?? ""}
                            yelpImage={this.state.yelpImage ?? ""}
                            yelpUserReviews={this.state.yelpUserReviews ?? ""}
                            yelpPrice={this.state.yelpPrice ?? ""}/>
                </div>
                : <div></div>}
                </Grid>
                </Grid>
                <Grid container direction="column">
                <Grid style={{'gridColumn': '1/3'}}>
                {this.state.zomatoName !== "" ?
                <div> 
                <h2>Zomato</h2>
                        <ZomatoReviewCard zomatoName={this.state.zomatoName ?? ""}
                            zomatoAddress={this.state.zomatoAddress ?? ""}
                            zomatoWebsite={this.state.zomatoWebsite ?? ""}
                            zomatoPriceRange={this.state.zomatoPriceRange ?? ""}
                            zomatoUserReviews={this.state.zomatoUserReviews ?? ""}
                            zomatoRating={this.state.zomatoRating ?? ""}
                            zomatoImage={this.state.zomatoImage ?? ""}/>
                </div>
                : <div></div>}
                   </Grid>
                </Grid>
            </div>
        </div>
        );
    }
    }
}
const YelpReviewCard = ({yelpName, yelpPhone, yelpAddress, yelpWebsite, yelpPrice, yelpRating, yelpUserReviews, yelpImage}) =>{
    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <div className="tc review-component  br3 pa3 ma2 dib bw2 shadow-5 sunflower-light mw-75 w-75">
                    <h1>
                        Yelp Review:
                    </h1>
                    <img src={yelpImage} alt=""></img>
                    <h3>
                        Name: {yelpName ?? "Please select a yelp review for comparison"} <br />
                        Phone: {yelpPhone ?? ""} <br />
                        Address: {yelpAddress ?? ""} <br />
                        Webpage:<br/><a href= {yelpWebsite ?? ""}>Link</a><br/>
                        Price: {yelpPrice ?? ""} <br />
                        Rating: {yelpRating ?? ""} <br />
                        Individual Reviews: <br />
                        <hr/>
                    </h3>
                    <div className = "reviewBox">
                        {yelpUserReviews != null ? yelpUserReviews.map((re, i) => {
                        return <h3 key={i.toString()} className = "review">
                            {yelpUserReviews[i].rating}/5 -  {yelpUserReviews[i].text} <br />
                           </h3>
                        }) : ""}
                     </div>
                </div>
            </Grid>
        </div>
    );
}
const GoogleReviewCard = ({gpName, gpPhone, gpAddress, gpPrice, gpRating, gpWebsite, gpUserReviews,gpImage}) =>{
    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <div className="tc review-component  br3 pa3 ma2 dib bw2 shadow-5 sunflower-light mw-75 w-75">
                    <h1>
                        Google Review:
                    </h1>
                    <img src={gpImage} alt=""></img>
                    <h3>
                        Name: {gpName ?? "Please select a google review for comparison"} <br />
                        Phone: {gpPhone ?? ""} <br />
                        Address: {gpAddress ?? ""} <br />
                        Webpage:<br/><a href={gpWebsite ?? ""}>Link</a> <br/>
                        Price: {gpPrice ?? ""} <br/>
                        Rating: {gpRating ?? ""} <br />
                        Individual Reviews: <br />
                    </h3>
                     <div className = "reviewBox">
                        {gpUserReviews != null ? gpUserReviews.map((re, i) => {
                        return <h3 key={i.toString()} className = "review">
                            {gpUserReviews[i].rating}/5 -  {gpUserReviews[i].text} <br />
                           </h3>
                        }) : ""}
                     </div>
                </div>
            </Grid>
        </div>
    );
}

const ZomatoReviewCard = ({zomatoName, zomatoPriceRange, zomatoImage, zomatoWebsite, zomatoAddress, zomatoRating, zomatoUserReviews}) =>{
    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <div className="tc review-component  br3 pa3 ma2 dib bw2 shadow-5 sunflower-light mw-75 w-75">
                    <h1>
                        Zomato Review  
                    </h1>
                    <img className="mw-75 w-75" src={zomatoImage} alt=""></img>
                    <h3>
                        Name: {zomatoName ?? "Please select a zomato review for comparison"} <br />
                        Address: {zomatoAddress ?? ""} <br />
                        Webpage:<br/><a href={zomatoWebsite ?? ""}>Link</a><br />
                        Price: {zomatoPriceRange ?? ""} <br/>
                        Rating: {zomatoRating ?? ""} <br />
                        Individual Reviews: <br />
                    </h3>
                     <div className = "reviewBox">
                        {zomatoUserReviews != null ? zomatoUserReviews.map((re, i) => {
                        return <h3 key={i.toString()} className = "review">
                            {zomatoUserReviews[i].review.rating}/5 -  {zomatoUserReviews[i].review.review_text} <br />
                           </h3>
                        }) : ""}

                     </div>
                </div>
            </Grid>
        </div>
    );
}

export default CompareComponent;