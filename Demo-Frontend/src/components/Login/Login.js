import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login(props) {



    let navigate = useNavigate();

    const [userDetails, setuserDetails] = useState({
        email: "",
        password: ""
    })

    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [emailErrorMsg, setEmailErrorMsg] = useState("")
    const [loginErrorMessage, setLoginErrorMessage] = useState("")

    const onChangeField = (e) => {
        setuserDetails({ ...userDetails, [e.target.name]: e.target.value })

        if (e.target.name === "email" && e.target.value !== "") {
            setErrorEmail(false)
            setEmailErrorMsg("Email is required")
        }
        else if (e.target.name === "password" && e.target.value !== "") {
            setErrorPassword(false)
        }
    }


    const loginUser = async (userDetails) => {
        const {  email, password } = userDetails;
        await axios.post("http://localhost:9098/api/auth/login", {
             email, password
        })
            .then(function (response) {
                if (response.status === 200) {
                    console.log("response.token", response)
                    setLoginSuccess(true)
                    setLoginError(false)
                    localStorage.setItem("gg",response.data.token)
                    props.setIsSign(true)
                    setTimeout(() => {
                        navigate("/profile")
                    }, 2000);
                }
                else if (response.status === 404) {
                    setLoginSuccess(false)
                    setLoginError(true)
                    setLoginErrorMessage(response.message)
                }
            })
            .catch((response) => {
                if (response.response.status === 404) {
                    setLoginSuccess(false)
                    setLoginError(true)
                    setLoginErrorMessage(response.response.data.message)
                }
                else {
                    setLoginSuccess(false)
                    setLoginError(true)
                    setLoginErrorMessage(response.response.data.message)
                }
            });
    }






    return (
        <React.Fragment>
            <div className='login-wrapper'>
                <div className='login-card'>
                    <div className='login-img'>
                        <img src='https://quicentro.registragana.com/public/img/login-bg.jpg' alt='login'></img>
                    </div>
                    <div className='login-fields'>
                        <div className='login-heading'>Login</div>
                        <input type={"text"} placeholder='Email' name='email' value={userDetails.email} onChange={(e) => onChangeField(e)}/>
                        {errorEmail && <p className='errorMessage'>{emailErrorMsg}</p>}
                        <br />
                        <input type={"password"} placeholder='Password' name='password' value={userDetails.password} onChange={(e) => onChangeField(e)}/>
                        {errorPassword && <p className='errorMessage'>{"Password is required"}</p>}
                        <p>I forgot my password</p>
                        {loginSuccess && <p className='successMessage'>Login Success</p>}
                        {loginError && <p className='errorMessage'>{loginErrorMessage}</p>}
                        <button onClick={() => loginUser(userDetails)}>LOG IN</button>
                        <p>You do not have an account? <Link to={"/register"}>create user </Link> </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login