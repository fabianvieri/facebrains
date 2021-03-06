import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onchange, onsubmit }) => {
    return (
        <div>
            <p className="f3">
                {'this magic brain will detect faces in your pictures.'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" onChange={onchange} />
                    <button
                        className="bg-light-purple w-30 grow f4 link ph3 pv2 dib white"
                        onClick={onsubmit}>
                        Detect
                    </button>
                </div>
            </div>
        </div>

    );
}

export default ImageLinkForm;