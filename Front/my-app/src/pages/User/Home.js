import React from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const gotoLogin = () => {
    return navigate('/user/login');
  };
  const gotoprofile = () => {
    return navigate('/user/profile');
  };
  return (
    <div>
      <h1>HOME</h1>
      <button onClick={gotoLogin}>Login</button>
      <button onClick={gotoprofile}>Profile</button>
    </div>
  );
};

export default Home;
