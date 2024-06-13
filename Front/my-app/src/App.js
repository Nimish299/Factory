import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <div>
      <Navbar />
      {/* <SocialFollow /> */}
      <BrowserRouter>
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover', // Ensure the background image covers the entire container
            backgroundPosition: 'center', // Center the background image
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Routes>{/* <Route path='/' element={<Home />} /> */}</Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
