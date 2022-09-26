import React from 'react'

function Footer() {
  return (
    <React.Fragment>
      <div className='footer-Wrapper'>
        <div className='row'>
          <div className='footer-address'>
            <h5>LOCATION</h5>
            <p>United Nations</p>
            <p>Avenue between December 6th</p>
            <p>Avenue and Shyris Avenue Quito</p>
            <p>- Ecuador</p>
            <p>022464526</p>
          </div>
          <div className='logo'>
            <img src='https://quicentro.registragana.com/public/img/upload_files/94c6c1ea-f2a0-4769-ac56-df4811548cb91595316245.png' alt='logo'></img>
          </div>
          <div className='contact'>
            <h5>LEGAL WARNING</h5>
            <p>1234567890</p>
            <p>test@test.com</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Footer