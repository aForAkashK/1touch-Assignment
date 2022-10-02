import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Profile() {

    const [data, setData] = useState([])
    console.log("data", data)
    console.log("data: ", data)
    useEffect(() => {
        const token = localStorage.getItem("gg")
        const config = {
            headers: {
                "auth-token": token
            }
        };
        axios.get("http://localhost:9098/api/auth/getuserdetails", config)
            .then(res => {
                if (res.status === 200) {
                    setData(res.data.data)
                }
            })
            .catch(err => console.log(err))


    }, [])

    return (
        <React.Fragment>
            <div className='profile-heading'>
                <p>Welcome {data.name}  </p>
            </div>
            <div className='profile-wrapper'>
                <div className='profile-pic'>
                    <img src={data.imgSrc ? data.imgSrc : "https://eform.etixdubai.com/App_Themes/DefaultNew/images/profile.png"} alt='profile' />
                </div>
                <div className='profile-details'>
                    <div details>
                        <p>Name : {data.name}</p>
                        <p>Email : {data.email}</p>
                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}

export default Profile