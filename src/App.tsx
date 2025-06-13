import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from 'react';
import { pingServer } from './services/api';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from './components/ui/provider';

import { PublicRoute } from './routes/PublicRoute';
import { NotFound } from './pages/NotFound/NotFound';

import { Header } from './components/Header/Header';
import { Nav } from './components/Nav/Nav';
import { Footer } from './components/Footer/Footer';

import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { Sobre } from './pages/Sobre/Sobre';
import { Crud } from './pages/CRUD/CRUD';

import LocalLogin from './pages/Login/LocalLogin';
import SocialLogin from './pages/Login/SocialIcons/SocialLogin';

import { Toaster } from './components/ui/toaster';
import { ToastListener } from './components/Listener/ToastListener';

import './App.css';
import './components/Buttons/Button.css'

function App() {
  useEffect(() => {
    pingServer();
  }, []);
  return (
    <Provider>
    <Router>
      <ToastListener/>
      <Toaster/>
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
            <Route path='/entrar/local' element={<LocalLogin/>}/>
            <Route path='/entrar/github' element={<SocialLogin provider="github"/>}/>
            <Route path='/entrar/google' element={<SocialLogin provider="google"/>}/>
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