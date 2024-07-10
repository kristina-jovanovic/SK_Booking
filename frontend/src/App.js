import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import NavBar from './components/NavBar';
import HotelsPage from './components/HotelsPage';
import HotelCard from './components/HotelCard';
import HotelDetails from './components/HotelDetails';
import Home from './components/Home';
import ReservationPage from './components/ReservationPage';

function App() {

  const [token, setToken] = useState();
  function addToken(auth_token) {
    setToken(auth_token);
  }
  const [user, setUser] = useState();
  function addUser(user) {
    setUser(user);
  }

  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path='/login' element={<LoginPage addToken={addToken} token={token} addUser={addUser} />} />
      </Routes>
      <Routes>
        <Route path='/register' element={<RegisterPage token={token} addUser={addUser} />} />
      </Routes>
      <Routes>
        <Route path='/' element={<NavBar token={token} addToken={addToken} addUser={addUser} />} >
          <Route path='hotels' element={<HotelsPage />} />
          <Route path='/' element={<Home />} />
          {/* <Route path='hotels/:id' element={<HotelDetails />} /> ovo ce trebati za unos, update i brisanje hotela */}
          <Route path='/reservations' element={<ReservationPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
