import { Route, Switch } from 'react-router-dom';
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

function App() {
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
          <Update />
        </Route>
        <Route path='/user/homes/:id_usuario' exact>
          <MyHomes />
        </Route>
        <Route path='/user/:id'>
          <Profile />
        </Route>
        <Route path='/userBookings' exact>
          <MyBookings />
        </Route>
        <Route path='/booking/:id' exact>
          <BookingId />
        </Route>
        <Route path='/search/:cityUrl?'>
          <SearchPage />
        </Route>
        <Route path='/createHome' exact>
          <CreateHome />
        </Route>
        <Route path='/updateHome/:id' exact>
          <UpdateHome />
        </Route>
        <Route path='/searchPage' exact>
          <div className='searchPage'>
            <SearchPage />
          </div>
        </Route>
        <Route path='/home/:id' exact>
          <ShowHome />
          {/* <Contacto />
          <Reserva /> */}
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
