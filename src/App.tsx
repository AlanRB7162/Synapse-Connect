import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from 'react';
import { pingServer } from './services/api';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from './components/ui/provider';
import { Flex } from '@chakra-ui/react';

import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';
import { NotFound } from './pages/NotFound/NotFound';

import { Header } from './components/Header/Header';
import { Nav } from './components/Nav/Nav';
import { Footer } from './components/Footer/Footer';

import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { Sobre } from './pages/Sobre/Sobre';
import { CriarCurso } from './pages/Meus Cursos/Criar/CriarCurso';
import { Crud } from './pages/CRUD/CRUD';

import LocalLogin from './pages/Login/LocalLogin';
import SocialLogin from './pages/Login/SocialIcons/SocialLogin';

import { Toaster } from './components/ui/toaster';
import { ToastListener } from './components/Listener/ToastListener';

import './App.css';
import './components/Buttons/Button.css'
import { Perfil } from './pages/Perfil/Perfil';

function App() {
  useEffect(() => {
    pingServer();
  }, []);
  return (
    <Provider>
    <Router>
      <ToastListener/>
      <Toaster/>
      <Flex className="app-container" direction="column" flexGrow={1} h={"100%"}>
        <Header/>
        <Nav/>
        <Flex className="main-container" flexGrow={1} mt="112px">
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
            <Route path='/meus-cursos/criar' element={
              <PrivateRoute>  
                <CriarCurso/>
              </PrivateRoute>
              }/>
            <Route path='/sobre' element={<Sobre/>}/>
            <Route path='/crud' element={<Crud/>}/>
            <Route path='/perfil' element={<Perfil/>}/>
          </Routes>
        </Flex>
        <Footer/>
      </Flex>
    </Router>
    </Provider>
  );
}

export default App;