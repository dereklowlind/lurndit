import './App.css'
import Mainpage from './pages/Mainpage'
import Showlist from './pages/ShowList'

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/course/:id" render={({ match }) => <Showlist id={match.params.id} />} /> 
          <Route path="/" component={Mainpage} />
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
