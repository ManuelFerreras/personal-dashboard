import "./styles/Menus.css";

import SideBar from "./components/SideBar";
import LoginMenu from "./components/LoginMenu";
import HomeBar from "./components/HomeBar";
import Earnings from "./components/Earnings";
import Investments from "./components/Investments";
import Todo from "./components/Todo";
import Excercise from "./components/Excercise";
import Objectives from "./components/Objectives";
import Notes from "./components/Notes";
import Expenses from "./components/Expenses";

import { useState } from "react";

function App() {
  const backendUrl = "http://localhost:3001/"

  const [menu, setMenu] = useState(0);
  const [todos, setTodos] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [lastMonthEarnings, setLastMonthEarnings] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [lastMonthExpenses, setLastMonthExpenses] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState({username: ""});

  const [showStats, setShowStats] = useState(false);

  const getUserInfo = async (authToken) => {
    const response = await fetch(backendUrl + "profile", {
      headers: {
        Authorization: `Bearer ${authToken["access_token"]}`
      }
    });

    const res = await response.json();

    if("statusCode" in res === false) {
        const currentDate = new Date();

        setUserInfo(res);

        setEarnings(await getUserEarningsForMonth(authToken, currentDate.getFullYear(), currentDate.getMonth() + 1)); // Get this Month Earnings.
        setExpenses(await getUserExpensesForMonth(authToken, currentDate.getFullYear(), currentDate.getMonth() + 1)); // Get this Month Expenses.
        setTodos(await getUserTodos(authToken)); // Get this Month Expenses.
      
        setLastMonthEarnings(await getUserEarningsForMonth(authToken, currentDate.getFullYear(), currentDate.getMonth())); // Get Last Month Earnings.
        setLastMonthExpenses(await getUserExpensesForMonth(authToken, currentDate.getFullYear(), currentDate.getMonth())); // Get Last Month Expenses.
        
        await getUserInvestments(authToken); // Get All User Investments.

    } else {
        window.location.reload();
    }

  }

  const getUserEarnings = async (authToken) => {

    const response = await fetch(backendUrl + "money-earning/getEarnings", {
      headers: {
        Authorization: `Bearer ${authToken["access_token"]}`
      }
    });

    const res = await response.json();


    setEarnings(res);

  }

  const getUserEarningsForMonth = async (authToken, year, month) => {

    const response = await fetch(backendUrl + `money-earning/getEarningsForMonth?from=${year}-${month}-01&to=${year}-${month}-31`, {
      headers: {
        Authorization: `Bearer ${authToken["access_token"]}`
      }
    });

    const res = await response.json();

    return res;

  }

  const addUserEarning = async (amount, description) => {

    if(!isNaN(amount) && amount) {
      if(description) {
            
        await fetch(backendUrl + `money-earning/newEarning?amount=${amount}&description=${description}`, {
          headers: {
            Authorization: `Bearer ${userToken["access_token"]}`
          },
          method: 'POST',
        });

        getUserEarnings(userToken);

      } else {alert("Bad Description Format.")}
    } else {alert("Bad Amount Format.")}

  }

  const deleteEarning = async (id) => {

    await fetch(backendUrl + `money-earning/delEarning?id=${id}`, {
      headers: {
        Authorization: `Bearer ${userToken["access_token"]}`
      },
      method: 'POST',
    });

    getUserEarnings(userToken);

  }

  const getUserExpenses = async (authToken) => {

    const response = await fetch(backendUrl + "money-expense/getExpenses", {
      headers: {
        Authorization: `Bearer ${authToken["access_token"]}`
      }
    });

    const res = await response.json();


    setExpenses(res);

  }

  const getUserExpensesForMonth = async (authToken, year, month) => {

    const response = await fetch(backendUrl + `money-expense/getExpensesForMonth?from=${year}-${month}-01&to=${year}-${month}-31`, {
      headers: {
        Authorization: `Bearer ${authToken["access_token"]}`
      }
    });

    const res = await response.json();

    return res;

  }

  const addUserExpense = async (amount, description) => {

    if(!isNaN(amount) && amount) {
      if(description) {

        await fetch(backendUrl + `money-expense/newExpense?amount=${amount}&description=${description}`, {
          headers: {
            Authorization: `Bearer ${userToken["access_token"]}`
          },
          method: 'POST',
        });

        getUserExpenses(userToken);
      
      } else {alert("Bad Description Format.")}
    } else {alert("Bad Amount Format.")}

  }

  const deleteExpense = async (id) => {

    await fetch(backendUrl + `money-expense/delExpense?id=${id}`, {
      headers: {
        Authorization: `Bearer ${userToken["access_token"]}`
      },
      method: 'POST',
    });

    getUserExpenses(userToken);

  }

  const getUserTodos = async (authToken) => {

    const response = await fetch(backendUrl + "todo/getTodos", {
      headers: {
        Authorization: `Bearer ${authToken["access_token"]}`
      }
    });

    const res = await response.json();


    setTodos(res);

  }

  const getUserTodosForMonth = async (authToken, year, month) => {

    const response = await fetch(backendUrl + `todo/getTodosForMonth?from=${year}-${month}-01&to=${year}-${month}-31`, {
      headers: {
        Authorization: `Bearer ${authToken["access_token"]}`
      }
    });

    const res = await response.json();

    return res;

  }

  const addUserTodo = async (title, description) => {

    if(title) {
      if(description) {

        await fetch(backendUrl + `todo/newTodo?title=${title}&description=${description}`, {
          headers: {
            Authorization: `Bearer ${userToken["access_token"]}`
          },
          method: 'POST',
        });

        getUserTodos(userToken);
      
      } else {alert("Bad Description Format.")}
    } else {alert("Bad Title Format.")}

  }

  const deleteTodo = async (id) => {

    await fetch(backendUrl + `todo/delTodo?id=${id}`, {
      headers: {
        Authorization: `Bearer ${userToken["access_token"]}`
      },
      method: 'POST',
    });

    getUserTodos(userToken);

  }

  const getUserInvestments = async (authToken) => {

    const response = await fetch(backendUrl + "investment/getInvestments", {
      headers: {
        Authorization: `Bearer ${authToken["access_token"]}`
      }
    });

    const res = await response.json();

    setInvestments(res);

  }

  const addUserInvestment = async (amount, returned_amount, title, description) => {

    if(!isNaN(amount) && amount) {
      if(!isNaN(returned_amount) && returned_amount) {
        if(title) {
          if(description) {

            await fetch(backendUrl + `investment/newInvestment?amount=${amount}&returned_amount=${returned_amount}&title=${title}&description=${description}`, {
              headers: {
                Authorization: `Bearer ${userToken["access_token"]}`
              },
              method: 'POST',
            });

            getUserInvestments(userToken);

          } else {alert("Bad Description Format.")}
        } else {alert("Bad Title Format.")}
      } else {alert("Bad Returned Amount Format.")}
    } else {alert("Bad Amount Format.")}

  }
  
  const addReturnedAmount = async (amount, id) => {

    if(id) {
      if(!isNaN(amount) && amount) {
      
        await fetch(backendUrl + `investment/addReturnedAmount?id=${id}&amount=${amount}`, {
          headers: {
            Authorization: `Bearer ${userToken["access_token"]}`
          },
          method: 'POST',
        });

        getUserInvestments(userToken);

      } else {alert("Incorrect Amount.")}
    } else {alert("Invalid Investment.")}

  }

  const deleteInvestment = async (id) => {

    if(id) {

      await fetch(backendUrl + `investment/delInvestment?id=${id}`, {
        headers: {
          Authorization: `Bearer ${userToken["access_token"]}`
        },
        method: 'POST',
      });

      getUserInvestments(userToken);

    } else {
      alert("Invalid Investment.")
    }

  }

  return (
    <>
        {
          userToken === null? (

            <LoginMenu setUserToken={setUserToken} getUserInfo={getUserInfo} />

          ) : (

            <>
              <div className="contenedor">

                <SideBar menu={menu} setMenu={setMenu} showStats={showStats} setShowStats={setShowStats} />

                {

                  menu === 0? (
                    <HomeBar earnings={earnings} expenses={expenses} investments={investments} userInfo={userInfo} showStats={showStats} lastMonthEarnings={lastMonthEarnings} lastMonthExpenses={lastMonthExpenses} />
                  ) : menu === 1? (
                    <Earnings earnings={earnings} deleteEarning={deleteEarning} addEarning={addUserEarning} showStats={showStats} />
                  ) : menu === 2? (
                    <Expenses expenses={expenses} deleteExpense={deleteExpense} addExpense={addUserExpense} showStats={showStats} />
                  ) : menu === 3? (
                    <Investments investments={investments} deleteInvestment={deleteInvestment} addInvestment={addUserInvestment} addReturnedAmount={addReturnedAmount} showStats={showStats} />
                  ) : menu === 4? (
                    <Todo todos={todos} deleteTodo={deleteTodo} addTodo={addUserTodo} />
                  ) : menu === 5? (
                    <Excercise />
                  ) : menu === 6? (
                    <Objectives />
                  ) : (
                    <Notes />
                  )

                } 
              
              </div>

            </>

          )

        }        

    </>
  );
}

export default App;
