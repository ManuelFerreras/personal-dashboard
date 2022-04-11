import "./styles/App.css";
import "./styles/Menus.css";

import SideBar from "./components/SideBar";
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
  const [menu, setMenu] = useState(0);
  const [earnings, setEarnings] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [investments, setInvestments] = useState([]);

  return (
    <>

      <div className="contenedor">

        <SideBar menu={menu} setMenu={setMenu} />

        {

          menu == 0? (
            <HomeBar earnings={earnings} expenses={expenses} investments={investments} />
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
  );
}

export default App;
