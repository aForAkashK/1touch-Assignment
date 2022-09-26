import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <React.Fragment>
            <div className='nav'>
                <div className='header-wrapper'>
                    <div className='logo-Wrapper'>
                        <Link to={'/'}>
                            <img src='https://quicentro.registragana.com/public/img/upload_files/bd2a9337-125b-40a0-8dd2-cc8b48082e051614017708.png' alt='Logo'></img>
                        </Link>
                    </div>
                    <div className='auth-btn-wrapper'>
                        <Link to={"/login"}>
                            <button className="btn register-btn">Login</button>
                        </Link>
                        <Link to={"/register"}>
                            <button className="btn register-btn">Register</button>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header