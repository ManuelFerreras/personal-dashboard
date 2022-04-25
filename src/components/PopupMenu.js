import React from "react";

import "../styles/PopupMenu.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function PopupMenu({ popupMenuTitle, setPopupMenuOpened, investments, setInvestments, popupInvestId }) {

    return(

        <>

            <div className="menu-bg">

                <div className="menu">

                    <h2>Add Returned Money to {popupMenuTitle}</h2>
                    <FontAwesomeIcon icon={faXmark} className="delete-entry delete-entry-invest" onClick={() => {
                        setPopupMenuOpened(false);
                    }} />
                    <input className="earning-input" id="new-earning-returned" placeholder="Returned Amount" onChange={(val) => {
                        if (val["target"].value[0] != "$") {
                            let newVal = "$" + val["target"].value.toString();
                            val["target"].value = newVal;
                        }
                        if ((isNaN(val["target"].value[val["target"].value.length - 1]))) {
                            let newVal = val["target"].value.toString().substring(0, val["target"].value.length - 1);
                            val["target"].value = newVal;
                        }
                    }}></input>
                    <button className="btn-add soft-shadow" onClick={() => {
                        let localInvests = investments;
                        localInvests[popupInvestId][1] = parseInt(localInvests[popupInvestId][1]) + parseInt(document.querySelector("#new-earning-returned").value.toString().substring(1, document.querySelector("#new-earning-returned").value.toString().length));
                        setInvestments(localInvests);
                        setPopupMenuOpened(false);
                    }}>Add New Return</button>

                </div>

            </div>

        </>

    );

}

export default PopupMenu;