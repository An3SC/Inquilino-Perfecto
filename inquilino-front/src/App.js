import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Inicio/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
