import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Inicio/Home';
import Login from './Login/Login';
import Recovery from './Login/Recovery';
import Register from './Login/Register';
import SearchPage from './Viviendas/SearchPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        {/*
        FUNCIÓN CON USO DE PARAMS
        <Route path='/search/:city/:banos' exact>
          <SearchPage />
        </Route> */}
        <Route path='/search'>
          <SearchPage />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/recovery' exact>
          <Recovery />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
