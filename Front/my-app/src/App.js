import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/User/Home';
import PlayerLogin from './pages/User/PlayerLogin';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user/login' element={<PlayerLogin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
