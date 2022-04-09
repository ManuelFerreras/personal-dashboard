import "./styles/App.css";

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
  const [menu, setMenu] = useState(0)

  return (
    <>

      <div className="contenedor">

        <SideBar menu={menu} setMenu={setMenu} />

        {

          menu == 0? (
            <HomeBar />
          ) : menu == 1? (
            <Earnings />
          ) : menu == 2? (
            <Expenses />
          ) : menu == 3? (
            <Investments />
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
