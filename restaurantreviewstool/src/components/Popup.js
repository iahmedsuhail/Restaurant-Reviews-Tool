import React from 'react';  
import '../App.css';

class Popup extends React.Component {  
  render() {  
        return (  
        <div className='popup'>  
                <h1 className="sunflower-medium">The review has been added, go to the compare page to view it</h1>  
                <button className='grow f4 ph3 pv2 dib white bg-light-purple' onClick={this.props.closePopup}>close</button>  
        </div>  
        );  
    }  
}  

export default Popup;