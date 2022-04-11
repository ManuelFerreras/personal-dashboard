import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'



function Earnings({ earnings, setEarnings }) {

    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dicember"];
    let month = new Date().getMonth();

    return(
        <>
        
            <div className="home-content">
                <div className="top">
                    <h1>{months[month]} Earnings</h1>
                </div>


                <div className={earnings.length == 0? "mid no-content" : "mid"}>

                    {earnings.length == 0? (
                        <p>No Earnings Registered Yet!</p>
                    ) : earnings.map((item,index) => {
                        return ( <div className="entry entry-prof" key={index}>
                            <p className="entry-value">{item[0]}</p>
                            <p>{item[1]}</p>
                            <FontAwesomeIcon icon={faXmark} className="delete-entry" onClick={() => {
                                let arr = earnings;
                                arr.splice(index, 1);
                                setEarnings([...arr]);
                            }} />
                        </div> );
                    })}

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
                        setEarnings([...earnings, [document.querySelector("#earning").value, document.querySelector("#earning-reason").value]])
                    }}>Add New Earning</button>
                </div>
            </div>

        </>
    );

}

export default Earnings;