import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import TextCard from "./TextCard";



function Expenses({ expenses, deleteExpense, addExpense, showStats }) {

    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dicember"];
    const month = new Date().getMonth() + 1;

    let totalExpenses = 0;
    let lastMonthExpenses = 0;

    expenses.map(val => (
        totalExpenses -= parseInt(val["amount"])
    ));

    return(
        <>
        
            <div className="home-content">
                <div className="top">
                    
                    <div className="overview-text">
                        <h1>{months[month]} Earnings</h1>
                    </div>
                </div>

                <div className="mid-container">

                    <div className={expenses.length === 0? "mid no-content" : "mid"}>

                        {expenses.length === 0? (
                            <p>No Expenses Registered Yet!</p>
                        ) : expenses.map((item,index) => {
                            return ( <div className="entry entry-loss" key={index}>
                                <p className="entry-value">${showStats? item["amount"] : "***"}</p>
                                <p>{item["description"]}</p>
                                <FontAwesomeIcon icon={faXmark} className="delete-entry" onClick={() => {
                                    deleteExpense(item["_id"]);
                                }} />
                            </div> );
                        })}

                    </div>

                    <TextCard title="Exepenses" body="Total Expenses This Month" number={totalExpenses} comparison={Math.round((totalExpenses * 100 / lastMonthExpenses) - 100)} decorator="$" hidden={showStats} />     

                </div>


                <div className="bot">
                    <input className="earning-input" id="earning" placeholder="$0" onChange={(val) => {
                        if (val["target"].value[0] !== "$") {
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
                        addExpense(document.querySelector("#earning").value.substring(1, document.querySelector("#earning").value.length), document.querySelector("#earning-reason").value)
                    }}>Add New Expense</button>
                </div>
            </div>

        </>
    );

}

export default Expenses;