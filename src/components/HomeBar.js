import React, { useState } from "react";
import "../styles/HomeBar.css";
import "../styles/Cards.css";

import TextCard from "./TextCard";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


function HomeBar({ earnings, expenses, investments, userInfo }) {

    const [showStats, setShowStats] = useState(false);

    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dicember"];
    const month = new Date().getMonth() + 1;

    let totalEarnings = 0;
    let lastMonthEarnings = 0;

    let totalExpenses = 0;
    let lastMonthExpenses = 0;

    let totalAddedInvestments = 0;
    let lastMonthAddedInvestments = 0;

    earnings.map(val => {
        totalEarnings += parseInt(val["amount"]);
    });
    expenses.map(val => {
        totalExpenses -= parseInt(val["amount"]);
    });
    investments.map(val => {
        totalAddedInvestments += parseInt(val["amount"]);
    });

    return(
        <>
        
            <div className="home-content">
                <div className="top">
                    <h1>Hello, {userInfo["username"]}</h1>
                    <p>Welcome Back!</p>
                </div>


                <div className="mid homebar-mid">
                    <div className="overview-text">
                        <h2 className="text-center">{months[month]} Overview</h2>
                        {showStats? <FontAwesomeIcon icon={faEye} className="show-btn" onClick={() => setShowStats(false)} /> : <FontAwesomeIcon icon={faEyeSlash} className="show-btn" onClick={() => setShowStats(true)} />}
                    </div>
                    
                    <div className="cards">
                        <TextCard title="Earnings" body="Total Earnings This Month" number={totalEarnings} comparison={Math.round((totalEarnings * 100 / lastMonthEarnings) - 100)} decorator="$" hidden={showStats} />
                        <TextCard title="Investments" body="Added Investments This Month" number={totalAddedInvestments} comparison={Math.round((totalAddedInvestments * 100 / lastMonthAddedInvestments) - 100)} decorator="$" hidden={showStats} />

                        <TextCard title="Expenses" body="Total Expenses This Month" number={totalExpenses} comparison={Math.round((totalExpenses * 100 / lastMonthExpenses) - 100) * -1} decorator="$" hidden={showStats} />
                        <TextCard title="Objectives" body="Objectives Achieved This Month" number="1" comparison={52} hidden={showStats} />
                    </div>
                </div>


                <div className="bot">
                    
                </div>
            </div>

        </>
    );

}

export default HomeBar;