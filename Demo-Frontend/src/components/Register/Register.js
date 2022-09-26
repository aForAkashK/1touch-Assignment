import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

function Register() {
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
    const [registerErrorMessage, setRegisterErrorMessage] = useState("")

    console.log("registerError", registerError)

    const onChangeField = (e) => {
        setuserDetails({ ...userDetails, [e.target.name]: e.target.value })
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
                        <Navigate to="/" />
                    }, 2000);
                }
                else if (response.status === 404) {
                    console.log("I am here")
                    setRegisterSuccess(false)
                    setRegisterError(true)
                    setRegisterErrorMessage(response.message)
                }
            })
            .catch((response) => {
                if (response.response.status === 404) {
                    console.log("I am here")
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

        // {
        //     isError: true,
        //     message: response.message,
        // }

    }

    const handleSubmit = () => {
        if (userDetails.name === "" || userDetails.email === "" || userDetails.password === "") {
            setErrorName(true)
            setErrorEmail(true)
            setErrorPassword(true)
        }
        else if (userDetails.name === "") {
            setErrorName(true)
        }
        else if (userDetails.email === "") {
            setErrorEmail(true)
        }
        else if (userDetails.password === "") {
            setErrorPassword(true)
        }
        else {
            registerUser(userDetails)
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
                        <input placeholder='Name' name='name' value={userDetails.name} onChange={(e) => onChangeField(e)} />
                        <input placeholder='Email' name='email' value={userDetails.email} onChange={(e) => onChangeField(e)} />
                        <br />
                        <input placeholder='Password' name='password' value={userDetails.password} onChange={(e) => onChangeField(e)} />
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