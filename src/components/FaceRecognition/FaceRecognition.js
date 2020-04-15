import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, box: { leftCol, rightCol, topRow, bottomRow } }) => {
    return (
        <div className="center ma">
            <div className="mt2 relative">
                <img id='inputimage' src={imageURL} alt="" width='500px' height='auto' />
                <div className="box" style={{ top: topRow, left: leftCol, right: rightCol, bottom: bottomRow }}></div>
            </div>
        </div>

    );
}

export default FaceRecognition;