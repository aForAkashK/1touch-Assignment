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
    const [file, setFile] = useState("")

    const [errorName, setErrorName] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const [registerError, setRegisterError] = useState(false)
    const [emailErrorMsg, setEmailErrorMsg] = useState("")
    const [registerErrorMessage, setRegisterErrorMessage] = useState("")
    const [errorProfile, setErrorProfile] = useState("")


    const onChangeField = (e) => {
        setuserDetails({ ...userDetails, [e.target.name]: e.target.value })
        if (e.target.name === "upload" && e.target.value !== "") {
            setErrorProfile(false)
            setFile(e.target.files[0])
        }
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

    const registerUser = async (userDetails, file) => {
        const { name, email, password } = userDetails;

        var formdata = new FormData();
        formdata.append("img", file, file.name);
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("password", password);
        await axios.post('http://localhost:9098/api/auth/register', formdata)
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
        if (userDetails.name === "" || userDetails.email === "" || userDetails.password === "" || file === "") {
            setErrorName(true)
            setErrorEmail(true)
            setErrorPassword(true)
            setErrorProfile(true)
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
        else if (file === "") {
            setErrorProfile(true)
        }
        else {
            if (emailRegx.test(userDetails.email)) {
                registerUser(userDetails, file)
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
                        <div className='browse'>
                            <input type={"file"} placeholder="Select your profile" name='upload' onChange={(e) => onChangeField(e)} />
                            {errorProfile && <p className='errorMessage'>{"Profile is required"}</p>}
                        </div>
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