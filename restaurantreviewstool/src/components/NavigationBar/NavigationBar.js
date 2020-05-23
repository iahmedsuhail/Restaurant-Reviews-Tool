import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../Logo/Logo.js'

const NavigationBar = () => {
    const history = useHistory();

    return(
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Logo/> {/* a logo for the RestrauntReviewsTool */}
            
            <div>
                <div className='f3 dim black pa2 pointer'>
                    <div onClick={() => history.goBack()} > 
                        Back
                    </div>
                </div>

                <div className='f3 dim black pa2 pointer'>
                    <Link className="no-underline" to='/'>
                        <p>Home</p>
                    </Link>
                </div>
            </div>
            
        </div>
    );
}

export default NavigationBar;