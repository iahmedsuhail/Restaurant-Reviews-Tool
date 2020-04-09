import React from 'react';
import logo from './Logo.png';

const Logo = () => {
    return(
        <div className ='ma4 mt0' style={{display: 'flex', justifyContent: 'flex-start'}}>
            <img alt='logo' src={logo} />
        </div>
    );
}
export default Logo;