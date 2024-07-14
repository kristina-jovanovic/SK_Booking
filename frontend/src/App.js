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
import ReservationForm from './components/ReservationForm';
import UsersStats from './components/UsersStats';

function App() {

  const [token, setToken] = useState();
  function addToken(auth_token) {
    setToken(auth_token);
  }
  const [user, setUser] = useState();
  function addUser(user) {
    setUser(user);
  }
  const [hotel, setHotel] = useState();
  function addHotel(hotel) {
    setHotel(hotel);
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
        <Route path='/' element={<NavBar token={token} addToken={addToken} addUser={addUser} user={user} />} >
          <Route path='/hotels' element={<HotelsPage addHotel={addHotel} user={user} />} />
          <Route path='/' element={<Home />} />
          <Route path='/hotels/:id' element={<HotelDetails hotel={hotel} token={token} />} />
          <Route path='/users/:id/reservations' element={<ReservationPage user={user} token={token} />} />
          <Route path='/reservations' element={<ReservationForm user={user} hotel={hotel} token={token} />} />
          <Route path='/stats' element={<UsersStats user={user} token={token} />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
