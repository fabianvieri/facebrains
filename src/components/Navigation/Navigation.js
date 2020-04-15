import React from 'react';

const Navigation = ({ onroutechange }) => {
    return (
        <nav className="flex justify-end">
            <p onClick={() => onroutechange('signin')} className="f3 white pa3 link dim underline pointer">Sign Out</p>
        </nav>
    );
}

export default Navigation;