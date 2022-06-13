import React from "react";
import "../styles/DataButton.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


function DataButton({ showStats, setShowStats }) {

    return(
        <>
        
            <div className="show-data">
                <div className="data" onClick={() => setShowStats(!showStats)}>
                    <p>Show Data</p>
                    {showStats? <FontAwesomeIcon icon={faEye} className="show-btn" /> : <FontAwesomeIcon icon={faEyeSlash} className="show-btn" />}
                </div>
            </div>
    

        </>
    );

}

export default DataButton;