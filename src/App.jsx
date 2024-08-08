import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import MainPage from './pages/MainPage'

function App() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(function() {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  function Protect({ isAuth, children }) {
    if (!isAuth) {
      navigate('/login');
    }
    return children;
  }

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mainpage' element={<MainPage></MainPage>}></Route>
        <Route index element={<Protect isAuth={token ? true : false}><Home /></Protect>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
