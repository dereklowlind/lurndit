import './App.css'
import Mainpage from './pages/Mainpage'
import CoursePage from './pages/CoursePage'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import DrawerMenu from './molecules/DrawerMenu'
import Helmet from 'react-helmet'


function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Lurndit</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700;800&display=swap" rel="stylesheet"/>
      </Helmet>
      <div className="pageContainer">
        <Router>
        <DrawerMenu />
          <Switch>
            <Route path="/course/:id" render={({ match }) => <CoursePage id={match.params.id} />} /> 
            <Route path="/" component={Mainpage} />
          </Switch>
          
        </Router>
      </div>
    </div>
  );
}

export default App;
