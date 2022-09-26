import './App.css';
import React from 'react'
import Body from './components/HomePage/Body';
import Footer from './components/HomePage/Footer';
import Header from './components/HomePage/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route>
              <Route path="/" element={<Body />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Profile" element={<Profile />} />
            </Route>
          </Routes>
        <Footer />
        </BrowserRouter>
      </React.Fragment>

    </div>
  );
}

export default App;
