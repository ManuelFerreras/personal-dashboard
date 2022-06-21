import React from "react";
import "../styles/SideBar.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBullseye, faChartLine, faDrawPolygon, faDumbbell, faHouseChimney, faMoneyBill1Wave, faMoneyBillTrendUp, faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import DataButton from "./DataButton";


function SideBar({ menu, setMenu, showStats, setShowStats }) {

    return(
        <>
        
            <div className="side-content">

                <h2><FontAwesomeIcon icon={faDrawPolygon} /> Menu</h2>

                <div className="options">
                    <p className={menu === 0? "link selected" : "link"} onClick={() => setMenu(0)}><FontAwesomeIcon icon={faHouseChimney} /> Home</p>
                    <p className={menu === 1? "link selected" : "link"} onClick={() => setMenu(1)}><FontAwesomeIcon icon={faChartLine} /> Earnings</p>
                    <p className={menu === 2? "link selected" : "link"} onClick={() => setMenu(2)}><FontAwesomeIcon icon={faMoneyBill1Wave} /> Expenses</p>
                    <p className={menu === 3? "link selected" : "link"} onClick={() => setMenu(3)}><FontAwesomeIcon icon={faMoneyBillTrendUp} /> Investments</p>
                    <p className={menu === 4? "link selected" : "link"} onClick={() => setMenu(4)}><FontAwesomeIcon icon={faBook} /> To-Do's</p>
                    <p className={menu === 5? "link selected" : "link"} onClick={() => setMenu(5)}><FontAwesomeIcon icon={faDumbbell} /> Excercise</p>
                    <p className={menu === 6? "link selected" : "link"} onClick={() => setMenu(6)}><FontAwesomeIcon icon={faBullseye} /> Objectives</p>
                </div>

                <DataButton showStats={showStats} setShowStats={setShowStats} />
            
            </div>

        </>
    );

}

export default SideBar;