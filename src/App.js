import "./styles/Menus.css";

import SideBar from "./components/SideBar";
import LoginMenu from "./components/LoginMenu";
import HomeBar from "./components/HomeBar";
import Earnings from "./components/Earnings";
import Investments from "./components/Investments";
import Study from "./components/Study";
import Excercise from "./components/Excercise";
import Objectives from "./components/Objectives";
import Notes from "./components/Notes";
import Expenses from "./components/Expenses";

import { useState } from "react";

function App() {
  const backendUrl = "http://localhost:3001/"

  const [menu, setMenu] = useState(0);
  const [earnings, setEarnings] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState({username: ""});

  const getUserInfo = async (authToken) => {
    const response = await fetch(backendUrl + "profile", {
      headers: {
        Authorization: `Bearer ${authToken["access_token"]}`
      }
    });

    const res = await response.json();

    if("statusCode" in res === false) {
        setUserInfo(res);
        await getUserEarnings(authToken);
        await getUserExpenses(authToken);
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

  const addUserEarning = async (amount, description) => {
    await fetch(backendUrl + `money-earning/newEarning?amount=${amount}&description=${description}`, {
      headers: {
        Authorization: `Bearer ${userToken["access_token"]}`
      },
      method: 'POST',
    });

    getUserEarnings(userToken);

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

  const addUserExpense = async (amount, description) => {

    await fetch(backendUrl + `money-expense/newExpense?amount=${amount}&description=${description}`, {
      headers: {
        Authorization: `Bearer ${userToken["access_token"]}`
      },
      method: 'POST',
    });

    getUserExpenses(userToken);

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

  return (
    <>

      

        {
          userToken === null? (

            <LoginMenu setUserToken={setUserToken} getUserInfo={getUserInfo} />

          ) : (

            <>
              <div className="contenedor">

                <SideBar menu={menu} setMenu={setMenu} />

                {

                  menu == 0? (
                    <HomeBar earnings={earnings} expenses={expenses} investments={investments} userInfo={userInfo} />
                  ) : menu == 1? (
                    <Earnings earnings={earnings} deleteEarning={deleteEarning} addEarning={addUserEarning} />
                  ) : menu == 2? (
                    <Expenses expenses={expenses} deleteExpense={deleteExpense} addExpense={addUserExpense} />
                  ) : menu == 3? (
                    <Investments investments={investments} setInvestments={setInvestments} />
                  ) : menu == 4? (
                    <Study />
                  ) : menu == 5? (
                    <Excercise />
                  ) : menu == 6? (
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
