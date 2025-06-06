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
import { PublicRoute } from './routes/PublicRoute';
import { NotFound } from './pages/NotFound/NotFound';
import { Sobre } from './pages/Sobre/Sobre';

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
            <Route path='/' element={<Home/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path="/entrar" 
              element={
                <PublicRoute>
                  <Login/>
                </PublicRoute>
              } 
            />
            <Route path='/crud' element={<Crud/>}/>
            <Route path='/sobre' element={<Sobre/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
    </Provider>
  );
}

export default App;