import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import Logo from '../Logo/Logo.js';
import './NavigationBar.css'

const NavigationBar = () => {
    const history = useHistory();
    return(
        <div className="flex justify-between-ns">
            <Logo /> {/* a logo for the RestrauntReviewsTool */}
        
            <div className='f3 dim black pa4 items-end'>
                <div className="pa3 measure sunflower-light black pointer" onClick={() => history.goBack()}>
                    Back
                <Link className="no-underline solid pa4 black" to='/'>
                    Home
                </Link>
                <Link className="no-underline black" to='/comparecomponent'>
                    Compare Reviews
                </Link>
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;