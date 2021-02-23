import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Home from './Inicio/Home';
import ShowHome from './Viviendas/ShowHome'
import Login from './Login/Login';
import Recovery from './Login/Recovery';
import Register from './Login/Register';
import CreateHome from './Viviendas/CreateHome';
import SearchPage from './Viviendas/SearchPage';
import Validate from './Login/Validate';
import Reset from './Login/Reset';
import Profile from './User/Profile';
import MyHomes from './Viviendas/MyHomes';
import Update from './User/Update';
import MyBookings from './Bookings/MyBookings';
import UpdateHome from './Viviendas/UpdateHome';
import BookingId from './Bookings/BookingId';
import { useSelector } from 'react-redux';

function App() {

  const login = useSelector(s => s.login)

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Route path='/validate/:code' exact>
          <Validate />
          <Login />
        </Route>
        <Route path='/recovery' exact>
          <Recovery />
        </Route>
        <Route path='/reset/:code' exact>
          <Reset />
        </Route>
        <Route path='/user/update/:id' exact>
          {login ?
            <Update />
            : <Redirect to='/' />}
        </Route>
        <Route path='/user/homes/:id' exact>
          {login ?
            <MyHomes />
            : <Redirect to='/' />}
        </Route>
        <Route path='/user/:id'>
          {login ?
            <Profile />
            : <Redirect to='/' />}
        </Route>
        <Route path='/userBookings' exact>
          {login ?
            <MyBookings />
            : <Redirect to='/' />}
        </Route>
        <Route path='/booking/:id' exact>
          {login ?
            <BookingId />
            : <Redirect to='/' />}
        </Route>
        <Route path='/search/:cityUrl?'>
          <SearchPage />
        </Route>
        <Route path='/createHome' exact>
          {login ?
            <CreateHome />
            : <Redirect to='/' />}
        </Route>
        <Route path='/myHome/:id' exact>
          {login ?
            <UpdateHome />
            : <Redirect to='/' />}
        </Route>
        <Route path='/searchPage' exact>
          <div className='searchPage'>
            <SearchPage />
          </div>
        </Route>
        <Route path='/home/:id' exact>
          <ShowHome />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;


// {login ?

// : <Redirect to='/' />}