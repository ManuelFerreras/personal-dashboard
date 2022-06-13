import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons'
import TextCard from "./TextCard";



function Earnings({ earnings, deleteEarning, addEarning }) {

    const [showStats, setShowStats] = useState(false);

    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dicember"];
    const month = new Date().getMonth() + 1;

    let totalEarnings = 0;
    let lastMonthEarnings = 0;

    earnings.map(val => {
        totalEarnings += parseInt(val["amount"]);
    });

    return(
        <>
        
            <div className="home-content">
                <div className="top">
                    <div className="overview-text">
                        <h1>{months[month]} Earnings</h1>
                        {showStats? <FontAwesomeIcon icon={faEye} className="show-btn" onClick={() => setShowStats(false)} /> : <FontAwesomeIcon icon={faEyeSlash} className="show-btn" onClick={() => setShowStats(true)} />}
                    </div>
                    
                </div>


                <div className="mid-container">

                    <div className={earnings.length == 0? "mid no-content" : "mid"}>

                        {earnings.length == 0? (
                            <p>No Earnings Registered Yet!</p>
                        ) : earnings.map((item,index) => {
                            return ( <div className="entry entry-prof" key={index}>
                                <p className="entry-value">${showStats? item["amount"] : "***"}</p>
                                <p>{item["description"]}</p>
                                <FontAwesomeIcon icon={faXmark} className="delete-entry" onClick={() => {
                                    deleteEarning(item["_id"]);
                                }} />
                            </div> );
                        })}

                    </div>

                    <TextCard title="Earnings" body="Total Earnings This Month" number={totalEarnings} comparison={Math.round((totalEarnings * 100 / lastMonthEarnings) - 100)} decorator="$" hidden={showStats} />     

                </div>


                <div className="bot">
                    <input className="earning-input" id="earning" placeholder="$0" onChange={(val) => {
                        if (val["target"].value[0] != "$") {
                            let newVal = "$" + val["target"].value.toString();
                            val["target"].value = newVal;
                        }
                        if ((isNaN(val["target"].value[val["target"].value.length - 1]))) {
                            let newVal = val["target"].value.toString().substring(0, val["target"].value.length - 1);
                            val["target"].value = newVal;
                        }
                    }}></input>
                    <input className="earning-input" id="earning-reason" type="text" min="0" placeholder="Reason"></input>
                    <button className="btn-add soft-shadow" onClick={() => {
                        addEarning(document.querySelector("#earning").value.substring(1, document.querySelector("#earning").value.length), document.querySelector("#earning-reason").value);
                    }}>Add New Earning</button>
                </div>
            </div>

        </>
    );

}

export default Earnings;