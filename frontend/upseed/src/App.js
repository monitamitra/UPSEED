import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       import UserProfile from './components/UserProfile';

function App() {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
  );
}

export default App;
