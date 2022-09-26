import React from 'react'
import instructionsdata from "../dummyData/instructionsdata.json"

function Body() {
  return (
    <React.Fragment>
      <div className='body-wrapper'>
        <div className='carousel-wrapper'>
          <img src='https://quicentro.registragana.com/public/img/upload_files/8aaff183-8f21-499b-8c22-36f90d3894991657298806.jpg' alt='carousel'></img>
        </div>
        <div className='info-wrapper'>
          <div className='info-head'>
            <p>INSTRUCTIONS</p>
          </div>
          <div className='cards'>
            {instructionsdata.map((item, index) => {
              return (
                <React.Fragment>
                  <div className='card' key={index}>
                    <div className='img-border'>
                      <div className='img-wrapper'>
                        <img src={item.imgpath} alt='info'></img>
                      </div>
                    </div>
                    <h5>{item.heading}</h5>
                    <p>{item.data}</p>
                  </div>
                  <span className='badge'>
                    <font style={{verticalAlign: "inherit"}}>
                      <font style={{verticalAlign: "inherit"}}>{item.id}</font>
                    </font>
                  </span>
                </React.Fragment>
              )
            })}
          </div>
          <div className='btn-wrapper'>
            <button className='btn-large btn-work'>HOW DOES IT WORKS</button>
            <button className='btn-large btn-terms'>SEE TERMS AND CONDITIONS</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Body