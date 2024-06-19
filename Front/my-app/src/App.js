import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/User/Home';
import PlayerLogin from './pages/User/PlayerLogin';
import Profile from './pages/User/Profile';
import EditProfile from './pages/User/EditProfile';
import ViewCard from './pages/Card/ViewCard';
import EditCard from './pages/Components/Card/EditCard';
import CreateCard from './pages/Card/CreateCard';
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
            <Route path='/card/:cardId' element={<ViewCard />} />
            <Route path='/createCard' element={<CreateCard />} />
            {/* <Route path='/Editcard/:cardId' element={<EditCard />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
