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
import ChangeEmail from './Login/ChangeEmail';
import ErrorBoundary from './ErrorBoundary';

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
          <ErrorBoundary>
            <Register />
          </ErrorBoundary>
        </Route>
        <Route path='/validate/:code' exact>
          <Validate />
          <Login />
        </Route>
        <Route path='/recovery' exact>
          <Recovery />
        </Route>
        <Route path='/changeMail/:id' exact>
          <ChangeEmail />
        </Route>
        <Route path='/reset/:code' exact>
          <Reset />
        </Route>
        <Route path='/user/update/:id' exact>
          {login ?
            <ErrorBoundary>
              <Update />
            </ErrorBoundary>
            : <Redirect to='/' />}
        </Route>
        <Route path='/user/homes/:id' exact>
          {login ?
            <ErrorBoundary>
              <MyHomes />
            </ErrorBoundary>
            : <Redirect to='/' />}
        </Route>
        <Route path='/user/:id'>
          {login ?
            <Profile />
            : <Redirect to='/' />}
        </Route>
        <Route path='/userBookings' exact>
          {login ?
            <ErrorBoundary>
              <MyBookings />
            </ErrorBoundary>
            : <Redirect to='/' />}
        </Route>
        <Route path='/booking/:id' exact>
          {login ?
            <ErrorBoundary>
              <BookingId />
            </ErrorBoundary>
            : <Redirect to='/' />}
        </Route>
        <Route path='/search/:cityUrl?'>
          <SearchPage />
        </Route>
        <Route path='/createHome' exact>
          {login ?
            <ErrorBoundary>
              <CreateHome />
            </ErrorBoundary>
            : <Redirect to='/' />}
        </Route>
        <Route path='/myHome/:id' exact>
          {login ?
            <ErrorBoundary>
              <UpdateHome />
            </ErrorBoundary>
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