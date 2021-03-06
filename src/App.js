import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';

function App() {
  return (
    <>
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
