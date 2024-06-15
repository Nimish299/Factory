import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/User/Home';
import PlayerLogin from './pages/User/PlayerLogin';
import Profile from './pages/User/Profile';
import EditProfile from './pages/User/EditProfile';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user/login' element={<PlayerLogin />} />
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/user/Edit-profile' element={<EditProfile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
