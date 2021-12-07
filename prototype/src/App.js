import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './components/Home.js'; 
import MatchList from './components/MatchList.js'
import Error from "./components/Error.js"

import {BrowserRouter as Router,
    Route,
    Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
        <div className="App">
        <header className="App-header">
            <p>
            LoL Match Analyzer
            </p>
        </header>
        </div>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/matchList/:summonerName" element = {<MatchList />} />
          <Route path="*" element = {<Error err="Page not found" />} />
      </Routes>
    </Router>
  );
};

export default App;
