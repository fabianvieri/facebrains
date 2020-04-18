import React from 'react';

const Navigation = ({ onroutechange, isSignedIn }) => {
    if(isSignedIn){
        return(
            <nav className="flex justify-end">
                <p onClick={() => onroutechange('signout')} className="f3 white pa3 link dim underline pointer">Sign Out</p>
            </nav>
        );
    } else {
        return(
            <nav className="flex justify-end">
                <p onClick={() => onroutechange('signin')} className="f3 white pa3 link dim underline pointer">Sign In</p>
                <p onClick={() => onroutechange('register')} className="f3 white pa3 link dim underline pointer">Register</p>
            </nav>
        );
    }
}

export default Navigation;