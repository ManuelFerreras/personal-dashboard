import "../styles/HomeBar.css";
import "../styles/Cards.css";

import TextCard from "./TextCard";


function HomeBar({ earnings, expenses, investments, userInfo, showStats, lastMonthEarnings, lastMonthExpenses }) {

    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dicember"];
    const month = new Date().getMonth() + 1;

    let totalEarnings = 0;
    let lastMonthEarningsAmount = 0;

    let totalExpenses = 0;
    let lastMonthExpensesAmount = 0;

    let totalAddedInvestments = 0;
    let lastMonthAddedInvestments = 0;

    earnings.map(val => (
        totalEarnings += parseInt(val["amount"])
    ));
    expenses.map(val => (
        totalExpenses -= parseInt(val["amount"])
    ));
    investments.map(val => (
        totalAddedInvestments += parseInt(val["returned_amount"])
    ));

    lastMonthEarnings.map(val => (
        lastMonthEarningsAmount += parseInt(val["amount"])
    ));
    lastMonthExpenses.map(val => (
        lastMonthExpensesAmount -= parseInt(val["amount"])
    ));

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
                    </div>
                    
                    <div className="cards">
                        <TextCard title="Earnings" body="Total Earnings This Month" number={totalEarnings} comparison={Math.round((totalEarnings * 100 / lastMonthEarningsAmount) - 100)} decorator="$" hidden={showStats} />
                        <TextCard title="Net Balance" body="Total Money Balance This Month" number={totalEarnings + totalExpenses} comparison={(totalEarnings + totalExpenses) * 100 / (lastMonthEarningsAmount + lastMonthExpensesAmount) - 100} decorator="$" hidden={showStats} />

                        <TextCard title="Expenses" body="Total Expenses This Month" number={totalExpenses} comparison={Math.round((totalExpenses * 100 / lastMonthExpensesAmount) - 100) * -1} decorator="$" hidden={showStats} />
                        <TextCard title="Investments" body="Returned From Investments This Month" number={totalAddedInvestments} comparison={Math.round((totalAddedInvestments * 100 / lastMonthAddedInvestments) - 100)} decorator="$" hidden={showStats} />
                    </div>
                </div>


                <div className="bot">
                    
                </div>
            </div>

        </>
    );

}

export default HomeBar;