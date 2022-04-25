import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import PopupMenu from "./PopupMenu";



function Earnings({ investments, setInvestments }) {

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
                        <div className={parseInt(item[0]) <= parseInt(item[1]) ? "card-entry entry-prof" : "card-entry entry-loss"} key={index}>
                            <h2 className="text-center">{item[3]}</h2>
                            <p className="entry-value">Invested: ${item[0]}</p>
                            <p>Returned: ${item[1]}</p>
                            <p>Description: {item[2]}</p>
                            <FontAwesomeIcon icon={faXmark} className="delete-entry" onClick={() => {
                                let arr = investments;
                                arr.splice(index, 1);
                                setInvestments([...arr]);
                            }} />
                            <button className={parseInt(item[0]) <= parseInt(item[1]) ? "btn-add btn-add-investment-profit soft-shadow" : "btn-add btn-add-investment-loss soft-shadow"} onClick={() => {
                                setPopupMenuTitle(item[3]);
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
                        setInvestments([...investments, [document.querySelector("#earning").value.toString().substring(1, document.querySelector("#earning").value.toString().length), document.querySelector("#earning-returned").value.toString().substring(1, document.querySelector("#earning-returned").value.toString().length), document.querySelector("#earning-description").value, document.querySelector("#earning-title").value]])
                    }}>Add New Investment</button>

                    { popupMenuOpened? <PopupMenu setPopupMenuOpened={setPopupMenuOpened} popupMenuTitle={popupMenuTitle} investments={investments} setInvestments={setInvestments} popupInvestId={popupInvestId} /> : null }
                    

                </div>
            </div>

        </>
    );

}

export default Earnings;