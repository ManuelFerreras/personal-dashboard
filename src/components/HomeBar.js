import React from "react";
import "../styles/HomeBar.css";
import "../styles/Cards.css";

import TextCard from "./TextCard";


function HomeBar() {

    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dicember"];
    let month = new Date().getMonth();

    return(
        <>
        
            <div className="home-content">
                <div className="top">
                    <h1>Hello Manu</h1>
                    <p>Welcome Back!</p>
                </div>


                <div className="mid">
                    <h2 className="text-center">{months[month]} Overview</h2>

                    <div className="cards">
                        <TextCard title="Earnings" body="Total Earnings This Month" number="2012" comparison={11} decorator="$" />
                        <TextCard title="Investments" body="Added Investments This Month" number="500" comparison={-22} decorator="$" />

                        <TextCard title="Learning" body="New Concepts Learnt This Month" number="3" comparison={-5} />
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