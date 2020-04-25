import React from 'react';
import {Link} from 'react-router-dom';

const NavigationBar = () => {
    return(
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div className='f3 dim black pa4 pointer'>
                <Link className="no-underline" to='/'>
                    <p>Home</p>
                </Link>
            </div>
        </div>
    );
}

export default NavigationBar;