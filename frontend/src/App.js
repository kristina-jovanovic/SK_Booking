import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import NavBar from './components/NavBar';
import HotelsPage from './components/HotelsPage';

function App() {

  const [token, setToken] = useState();
  function addToken(auth_token) {
    setToken(auth_token);
  }
  return (
    <BrowserRouter className="App">
      {/* <NavBar /> */}
      <Routes>
        <Route path='/login' element={<LoginPage addToken={addToken} />} />
      </Routes>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      <Routes>
        <Route path='/' element={<NavBar token={token} />} >
          <Route path='hotels' element={<HotelsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
