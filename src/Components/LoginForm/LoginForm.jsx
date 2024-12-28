import React, { useState } from "react";
import './LoginForm.scss';

const LoginForm = function(){
                
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");


        const handleButtonClick = async() => {
            const data = {
                username: username,
                password: password,
            };
            const jsonData = JSON.stringify(data);
            
            console.log(data);
            setPassword("");

            try{
                const response = await fetch("http://localhost:8080/users/loginAccount",{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: jsonData                                              
                })
                if (response.ok){
                    console.log("登入成功")
                    const responseData = await response.json();
                    console.log(responseData)
                    
                    if(responseData.data){
                        console.log("獲取資料", responseData.data)
                    }
                    else{
                        console.log("沒有data可獲取資料")
                    }
                }
                else{
                    console.log("登入失敗")
                }


            }catch(error){
                console.error("發生錯誤:", error);
            }

        };
    
    
    return(
        <div className="wrapper">
            <h1>Login</h1>
            <div className="inputBox">
                <i className="fa-solid fa-user"></i>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div className="inputBox">
                <i className="fa-solid fa-lock"></i>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>

            <div className="remember-forget">
                <label>
                    <input type="checkbox" /> Remember me
                </label>
                <a href="">Forgot password</a>
            </div>

            <button type="button" onClick={handleButtonClick}>Login</button>

            <div className="register-link">
                <p>
                    Don't have an account?
                    <a href="">Register</a>
                </p>
            </div>
        </div>
    )
}

export default LoginForm