import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <React.Fragment>
            <div className='login-wrapper'>
                <div className='login-card'>
                    <div className='login-img'>
                        <img src='https://quicentro.registragana.com/public/img/login-bg.jpg' alt='login'></img>
                    </div>
                    <div className='login-fields'>
                        <div className='login-heading'>Login</div>
                        <input placeholder='Email'/>
                        <br />
                        <input placeholder='Password'/>
                        <p>I forgot my password</p>
                        <button>LOG IN</button>
                        <p>You do not have an account? <Link to={"/register"}>create user </Link> </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login