import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'



function Expenses({ expenses, setExpenses }) {

    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dicember"];
    let month = new Date().getMonth();

    return(
        <>
        
            <div className="home-content">
                <div className="top">
                    <h1>{months[month]} Expenses</h1>
                </div>


                <div className={expenses.length == 0? "mid no-content" : "mid"}>

                    {expenses.length == 0? (
                        <p>No Expenses Registered Yet!</p>
                    ) : expenses.map((item,index) => {
                        return ( 
                        <div className="entry entry-loss" key={index}>
                            <p className="entry-value">{item[0]}</p>
                            <p>{item[1]}</p>
                            <FontAwesomeIcon icon={faXmark} className="delete-entry" onClick={() => {
                                let arr = expenses;
                                arr.splice(index, 1);
                                setExpenses([...arr]);
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
                        setExpenses([...expenses, [document.querySelector("#earning").value, document.querySelector("#earning-reason").value]])
                    }}>Add New Expense</button>
                </div>
            </div>

        </>
    );

}

export default Expenses;