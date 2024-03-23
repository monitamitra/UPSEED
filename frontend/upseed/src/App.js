import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import PostList from './PostList';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/" element = {<PostList/>}></Route>
        {/* <Route path="/Navbar" element = {<Navbar/>}></Route> */}
      </Routes>
   
  );
}

export default App;
