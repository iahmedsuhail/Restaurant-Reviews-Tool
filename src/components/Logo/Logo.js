import React from 'react';
import logo from './Logo.png';
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = () => {
    return(
        <div className="pl5">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 110, width: 110 }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '5px'}} alt='logo' src={logo}/>
                </div>
            </Tilt>
        </div>
    );
}
export default Logo;