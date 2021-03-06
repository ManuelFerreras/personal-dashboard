import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendDown, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'


function TextCard({ title, body, number, comparison, decorator, hidden }) {

    return(
        <>
        
            <div className={comparison >= 0? ("profit-card info-card") : ("loss-card info-card")}>

                <div className="card-content">
                    <h3>{title}</h3>
                    <p>{body}</p>
                    <p className={number >= 0? ("profit value") : ("loss value")}>{decorator}{hidden? number : "***"}</p>
                </div>

                <div className={comparison >= 0? ("profit card-comparison") : ("loss card-comparison")}>
                    {comparison >= 0? (
                        <FontAwesomeIcon className="profit" icon={faArrowTrendUp} />
                    ) : (
                        <FontAwesomeIcon className="loss" icon={faArrowTrendDown} />
                    )}
                    
                    <p className={comparison >= 0? ("profit") : ("loss")} >{comparison >= 0? ("+") : ("")}{hidden? (isFinite(comparison)? (isNaN(comparison)? "0" : comparison) : "0") : "**"}%</p>
                </div>

            </div>

        </>
    );

}

export default TextCard;