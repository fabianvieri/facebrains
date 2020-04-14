import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 40 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img className="pt2" src={logo} alt="logo" />
                </div>
            </Tilt>
        </div>
    );
}
export default Logo;