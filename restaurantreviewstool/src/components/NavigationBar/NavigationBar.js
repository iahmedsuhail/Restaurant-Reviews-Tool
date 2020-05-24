import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../Logo/Logo.js';

const NavigationBar = () => {
    const history = useHistory();

    return(
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Logo/> {/* a logo for the RestrauntReviewsTool */}

                <div className='f3 dim black pa2 pointer'>
                    <Link className="no-underline" onClick={() => history.goBack()}>
                        <p>Back</p>
                    </Link>
                </div>
                
                <div className='f3 dim black pa2 pointer'>
                    <Link className="no-underline" to='/'>
                        <p>Home</p>
                    </Link>
                    <Link className="no-underline" to='/comparecomponent'>
                        <p>Compare reviews</p>
                    </Link>
                </div>
            
        </div>
    );
}

export default NavigationBar;