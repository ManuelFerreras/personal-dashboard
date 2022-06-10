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
    console.log(authToken);

    const response = await fetch(backendUrl + "profile", {
      headers: {
        Authorization: `Bearer ${authToken["access_token"]}`
      }
    });

    const res = await response.json();
    
    console.log(res);

    if("statusCode" in res === false) {
        setUserInfo(res);
    } else {
        window.location.reload();
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

                <SideBar menu={menu} setMenu={setMenu} />

                {

                  menu == 0? (
                    <HomeBar earnings={earnings} expenses={expenses} investments={investments} userInfo={userInfo} />
                  ) : menu == 1? (
                    <Earnings earnings={earnings} setEarnings={setEarnings} />
                  ) : menu == 2? (
                    <Expenses expenses={expenses} setExpenses={setExpenses} />
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
