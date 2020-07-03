import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import './NavigationBar.css'

const NavigationBar = () => {
    const history = useHistory();
    return(
            <div style={{display: 'flex', justifyContent: 'flex-end'}} className="pa2">
                <div className="measure sunflower-medium black pointer pa3" onClick={() => history.goBack()}> Back </div>
                    <Link className="no-underline pa3 sunflower-medium black" to='/'> Home </Link>
                    <Link className="no-underline black pa3 sunflower-medium black" to='/comparecomponent'> Compare Reviews </Link>
            </div>
            
    );
}

export default NavigationBar;