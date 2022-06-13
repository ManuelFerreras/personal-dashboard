import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import PopupMenu from "./PopupMenu";



function Earnings({ investments, deleteInvestment, addInvestment, showStats }) {

    const [popupMenuOpened, setPopupMenuOpened] = useState(false);
    const [popupMenuTitle, setPopupMenuTitle] = useState("");
    const [popupInvestId, setPopupInvestId] = useState(0);

    return(
        <>
        
            <div className="home-content">
                <div className="top">
                    <h1>Investments</h1>
                </div>


                <div className={investments.length == 0? "mid no-content" : "mid mid-invests"}>

                    {investments.length == 0? (
                        <p>No Investments Registered Yet!</p>
                    ) : investments.map((item,index) => {
                        return ( 
                        <div className={parseInt(item["amount"]) <= parseInt(item["returned_amount"]) ? "card-entry entry-prof" : "card-entry entry-loss"} key={index}>
                            <h2 className="text-center">{item["title"]}</h2>
                            <p className="entry-value">Invested: ${item["amount"]}</p>
                            <p>Returned: ${item["returned_amount"]}</p>
                            <p>Description: {item["description"]}</p>
                            <FontAwesomeIcon icon={faXmark} className="delete-entry" onClick={() => {
                                deleteInvestment(item["_id"]);
                            }} />
                            <button className={parseInt(item["amount"]) <= parseInt(item["returned_amount"]) ? "btn-add btn-add-investment-profit soft-shadow" : "btn-add btn-add-investment-loss soft-shadow"} onClick={() => {
                                setPopupMenuTitle(item["title"]);
                                setPopupMenuOpened(true);
                                setPopupInvestId(index);
                            }}>Add Returned Money</button>
                        </div> );
                    })}

                </div>


                <div className="bot bot-invests">
                    <input className="earning-input" id="earning-title" type="text" min="0" placeholder="Investment Title"></input>
                    <input className="earning-input" id="earning" placeholder="Investment Amount" onChange={(val) => {
                        if (val["target"].value[0] != "$") {
                            let newVal = "$" + val["target"].value.toString();
                            val["target"].value = newVal;
                        }
                        if ((isNaN(val["target"].value[val["target"].value.length - 1]))) {
                            let newVal = val["target"].value.toString().substring(0, val["target"].value.length - 1);
                            val["target"].value = newVal;
                        }
                    }}></input>
                    <input className="earning-input" id="earning-returned" placeholder="Already Returned Amount" onChange={(val) => {
                        if (val["target"].value[0] != "$") {
                            let newVal = "$" + val["target"].value.toString();
                            val["target"].value = newVal;
                        }
                        if ((isNaN(val["target"].value[val["target"].value.length - 1]))) {
                            let newVal = val["target"].value.toString().substring(0, val["target"].value.length - 1);
                            val["target"].value = newVal;
                        }
                    }}></input>
                    <input className="earning-input" id="earning-description" type="text" min="0" placeholder="Investment Description"></input>
                    <button className="btn-add soft-shadow" onClick={() => {
                        addInvestment(document.querySelector("#earning").value.toString().substring(1, document.querySelector("#earning").value.toString().length), document.querySelector("#earning-returned").value.toString().substring(1, document.querySelector("#earning-returned").value.toString().length), document.querySelector("#earning-title").value, document.querySelector("#earning-description").value);
                    }}>Add New Investment</button>

                    { popupMenuOpened? <PopupMenu setPopupMenuOpened={setPopupMenuOpened} popupMenuTitle={popupMenuTitle} investments={investments} popupInvestId={popupInvestId} /> : null }
                    

                </div>
            </div>

        </>
    );

}

export default Earnings;