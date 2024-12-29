import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Routes, Route, Link} from "react-router-dom";
import Home from './pages/home';
import Create from './pages/create';
function App() {
  return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark p-4">
          <div className = "navbar-nav mr-auto">
            <li className="nav-item">
              <Link to = {"/"} className="nav-link">Home</Link>

            </li>
            <li className="nav-item">
              <Link to = {"/create"} className="nav-link">Create</Link>

            </li>

          </div>

        </nav>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/create' element={<Create />} />
            </Routes>
          </div>
    </div>
  );
}

export default App;
