import React from "react";
import fetch from 'node-fetch';

import "../styles/LoginMenu.css";

function LoginMenu({ setUserToken, getUserInfo }) {

    const backendUrl = "http://localhost:3001/"

    const login = async () => {

        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        if(username !== "" & password !== "") {

            const response = await fetch(backendUrl + "auth/login", {
                method: "POST",
                body: JSON.stringify({ username: username, password: password}),
                headers: {
                    "Content-Type": "application/json",
                },
            })
    
            const res = await response.json();

            if("statusCode" in res === false) {
                setUserToken(res);
                getUserInfo(res);
            } else {
                alert("Wrong Credentials.");
            }
            
            
        }
        

    }

    return(

        <>

            <div className="menu-bg">

                <div className="login-menu">

                    <h1 className="text-center">Login</h1>
                    <input className="credential-input earning-input" id="username" placeholder="Username"></input>
                    <input className="credential-input earning-input" id="password" placeholder="Password" type="password"></input>
                    <button className="btn-add soft-shadow" onClick={async () => await login()}>Login</button>

                </div>

            </div>

        </>

    );

}

export default LoginMenu;