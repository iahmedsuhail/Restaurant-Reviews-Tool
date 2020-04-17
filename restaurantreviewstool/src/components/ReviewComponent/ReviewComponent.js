import React from 'react';

class ReviewComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gpName: '', 
            gpAddress: '', 
            gpPhone: '', 
            gpRating: '',

            yelpName: '',
            yelpAddress: '',
            yelpPhone: '',
            yelpRating: ''
        }
    }

    // Calls to all APIs should be made in this method
    UNSAFE_componentWillMount(){
        //Data passed on from the search form
        var googleID = this.props.placeDetailsID;
        var name = this.props.name;
        var address = this.props.address;
        var rating = this.props.rating;
        // Call for Details from Google Places API

        fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyB4O1O9YEnEd8WnQ3afnSHuvDpx7vsycMw&place_id=${googleID}&type=restaurant&fields=formatted_address,formatted_phone_number,name,rating`)
        .then(response=> response.json())
        .then(data => {
            this.setState({ 
                gpName: data.result.name, 
                gpAddress: data.result.formatted_address, 
                gpPhone: data.result.formatted_phone_number, 
                gpRating: data.result.rating
            })
        })

        //Getting results from yelp, based on adress and name.
       fetch(`https://api.yelp.com/v3/businesses/search/term=restaurant&location=${address}&radius=40000&${name}`)
        .then(response => response.json())
        .then(data => {
            if(data.result.address1 === address && data.result.name === name){
                this.setState({
                    yelpName: data.result.name,
                    yelpAddress: data.result.address1,
                    yelpPhone: data.result.phone,
                    yelpRating: data.result.rating
                    })
                }
        })
    }

    render(){
        return(
            <div className="App">
                <h1> GOOGLE PLACES REVIEW</h1>
                Name: {this.state.gpName} <br />
                Phone: {this.state.gpPhone} <br />
                Address: {this.state.gpAddress} <br />
                Rating: {this.state.gpRating} <br />
                <hr/>
                <h1> YELP REVIEW</h1>
                Name: {this.state.gpName} <br />
                Phone: {this.state.gpPhone} <br />
                Address: {this.state.gpAddress} <br />
                Rating: {this.state.gpRating} <br />
            </div>
        );
    }
}

export default ReviewComponent;