import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from './components/ui/provider';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Login } from './pages/Login/Login';
import { pingServer } from './services/api';
import { Crud } from './pages/CRUD/CRUD';
import './App.css';
import './components/Buttons/Button.css'
import { Home } from './pages/Home/Home';
import { Nav } from './components/Nav/Nav';

function App() {
  useEffect(() => {
    pingServer();
  }, []);
  return (
    <Provider>
    <Router>
      <div className="app-container">
        <Header/>
        <Nav/>
        <main className="main-container">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path='/crud' element={<Crud/>}/>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
    </Provider>
  );
}

export default App;