import './App.css';
import React, { useEffect, useState } from 'react'
import Body from './components/HomePage/Body';
import Footer from './components/HomePage/Footer';
import Header from './components/HomePage/Header';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';

function App() {


  const [isSign, setIsSign] = useState("")


  const token = localStorage.getItem("gg")

  useEffect(() => {
    if (localStorage.getItem("gg")) {
      setIsSign(true)
    }
    else {
      setIsSign(false)
    }
  }, [])




  return (
    <div className="App">
      <React.Fragment>
        <BrowserRouter>
          <Header isSign={isSign} setIsSign={setIsSign} />
          <Routes>
            <Route>
              <Route path="/" element={<Body />} />
              <Route path="/login" element={token || isSign ? <Profile /> : <Login setIsSign={setIsSign} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Profile" element={token || isSign ? <Profile /> : <Navigate to={"/"} />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </React.Fragment>

    </div>
  );
}

export default App;
