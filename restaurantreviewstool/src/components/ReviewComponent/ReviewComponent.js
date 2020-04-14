import React from 'react';

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
                <h1> GOOGLE PLACES REVIEW</h1>
                Name: {this.state.gpName} <br />
                Phone: {this.state.gpPhone} <br />
                Address: {this.state.gpAddress} <br />
                Rating: {this.state.gpRating} <br />
            </div>
        );
    }
}

export default ReviewComponent;