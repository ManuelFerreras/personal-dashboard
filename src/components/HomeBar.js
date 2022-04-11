import React from "react";
import "../styles/HomeBar.css";
import "../styles/Cards.css";

import TextCard from "./TextCard";


function HomeBar({ earnings, expenses, investments }) {

    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dicember"];
    let month = new Date().getMonth();

    let totalEarnings = 0;
    let lastMonthEarnings = 100;

    let totalExpenses = 0;
    let lastMonthExpenses = -100;

    let totalAddedInvestments = 0;
    let lastMonthAddedInvestments = 120;

    earnings.map(val => {
        totalEarnings += parseInt(val[0].substring(1, val[0].length));
    });
    expenses.map(val => {
        totalExpenses -= parseInt(val[0].substring(1, val[0].length));
    });
    investments.map(val => {
        totalAddedInvestments += parseInt(val[0].substring(1, val[0].length));
    });

    return(
        <>
        
            <div className="home-content">
                <div className="top">
                    <h1>Hello Manu</h1>
                    <p>Welcome Back!</p>
                </div>


                <div className="mid homebar-mid">
                    <h2 className="text-center">{months[month]} Overview</h2>

                    <div className="cards">
                        <TextCard title="Earnings" body="Total Earnings This Month" number={totalEarnings} comparison={Math.round((totalEarnings * 100 / lastMonthEarnings) - 100)} decorator="$" />
                        <TextCard title="Investments" body="Added Investments This Month" number={totalAddedInvestments} comparison={Math.round((totalAddedInvestments * 100 / lastMonthAddedInvestments) - 100)} decorator="$" />

                        <TextCard title="Expenses" body="Total Expenses This Month" number={totalExpenses} comparison={Math.round((totalExpenses * 100 / lastMonthExpenses) - 100) * -1} decorator="$" />
                        <TextCard title="Objectives" body="Objectives Achieved This Month" number="1" comparison={52} />
                    </div>
                </div>


                <div className="bot">
                    
                </div>
            </div>

        </>
    );

}

export default HomeBar;