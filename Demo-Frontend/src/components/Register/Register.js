import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {

    let navigate = useNavigate();
    // eslint-disable-next-line
    const emailRegx = /[a-zA-Z][a-zA-Z0-9_\-\.]+[a-zA-Z0-9]+[@][a-z]+[\.][a-z]+/
    const [userDetails, setuserDetails] = useState({
        name: "",
        email: "",
        password: ""
    })

    // console.log("userDetails", userDetails)
    const [errorName, setErrorName] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const [registerError, setRegisterError] = useState(false)
    const [emailErrorMsg, setEmailErrorMsg] = useState("")
    const [registerErrorMessage, setRegisterErrorMessage] = useState("")


    const onChangeField = (e) => {
        setuserDetails({ ...userDetails, [e.target.name]: e.target.value })
        if (e.target.name === "name" && e.target.value !== "") {
            setErrorName(false)
        }
        else if (e.target.name === "email" && e.target.value !== "") {
            setErrorEmail(false)
            setEmailErrorMsg("")
        }
        else if (e.target.name === "password" && e.target.value !== "") {
            setErrorPassword(false)
        }
    }

    const registerUser = async (userDetails) => {
        const { name, email, password } = userDetails;


        await axios.post('http://localhost:9098/api/auth/register', {
            name, email, password
        })
            .then(function (response) {
                if (response.status === 200) {
                    setRegisterSuccess(true)
                    setRegisterError(false)
                    setTimeout(() => {
                        navigate("/login")
                    }, 2000);
                }
                else if (response.status === 404) {
                    setRegisterSuccess(false)
                    setRegisterError(true)
                    setRegisterErrorMessage(response.message)
                }
            })
            .catch((response) => {
                if (response.response.status === 404) {
                    setRegisterSuccess(false)
                    setRegisterError(true)
                    setRegisterErrorMessage(response.response.data.message)
                }
                else {
                    setRegisterSuccess(false)
                    setRegisterError(true)
                    setRegisterErrorMessage(response.response.data.message)
                }
            });
    }

    const handleSubmit = () => {
        if (userDetails.name === "" || userDetails.email === "" || userDetails.password === "") {
            setErrorName(true)
            setErrorEmail(true)
            setErrorPassword(true)
            setEmailErrorMsg("Email is required")
        }
        else if (userDetails.name === "") {
            setErrorName(true)
        }
        else if (userDetails.email === "") {
            setErrorEmail(true)
            setEmailErrorMsg("Email is required")
        }
        else if (userDetails.password === "") {
            setErrorPassword(true)
        }
        else {
            if (emailRegx.test(userDetails.email)) {
                registerUser(userDetails)
                setErrorName(false)
                setErrorEmail(false)
                setEmailErrorMsg("")
                setErrorPassword(false)
                setuserDetails({
                    name: "",
                    email: "",
                    password: ""
                })
            } else {
                setErrorEmail(true)
                setEmailErrorMsg("Please Enter Valid Email")
            }
        }
    }




    return (
        <React.Fragment>
            <div className='login-wrapper'>
                <div className='login-card'>
                    <div className='login-img'>
                        <img src='https://quicentro.registragana.com/public/img/register-bg1.png' alt='login'></img>
                    </div>
                    <div className='login-fields'>
                        <div className='login-heading'>Register</div>
                        <input type={"text"} placeholder='Name' name='name' value={userDetails.name} onChange={(e) => onChangeField(e)} />
                        {errorName && <p className='errorMessage'>{"Name is required"}</p>}
                        <input type={"text"} placeholder='Email' name='email' value={userDetails.email} onChange={(e) => onChangeField(e)} />
                        {errorEmail && <p className='errorMessage'>{emailErrorMsg}</p>}
                        <br />
                        <input type={"password"} placeholder='Password' name='password' value={userDetails.password} onChange={(e) => onChangeField(e)} />
                        {errorPassword && <p className='errorMessage'>{"Password is required"}</p>}
                        <p>I forgot my password</p>
                        {registerSuccess && <p className='successMessage'>Register Success</p>}
                        {registerError && <p className='errorMessage'>{registerErrorMessage}</p>}
                        <button onClick={handleSubmit}>Register</button>
                        <p>Already have an Accounct? <Link to={"/login"}>Login </Link> </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Register