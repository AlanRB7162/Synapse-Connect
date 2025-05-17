import { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from './components/ui/provider';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Login } from './pages/Login/Login';
import { pingServer } from './services/api';

function App() {
  useEffect(() => {
    pingServer();
  }, []);
  return (
    <Provider>
    <Router>
      <div className="app-container">
        <Header/>
        <main className="main-container">
          <Routes>
            <Route path="/login" element={<Login/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
    </Provider>
  );
}

export default App;