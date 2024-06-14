import React from 'react';
// import './PlayerLogin.css'; // Ensure you have appropriate CSS styles
// import { GoogleLogin } from 'react-google-login';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
// import { useState } from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';
const PlayerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');

  const handleSignupClick = () => {
    setIsLogin(false);
  };

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    setIsLogin(false);
  };
  const LoginFormSubmit = async (e) => {
    e.preventDefault();
    const user = { emailID, password };
    console.log(process.env.REACT_APP_URL);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}api/user/login`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const { token } = response.data;
        axios.defaults.headers.common['Authorization'] =
          token.length > 0 ? token : '';

        localStorage.setItem('auth-token', token);

        // return navigate('/player/home');
      } else {
        console.error('Error:', response.data.error);
      }
    } catch (error) {
      console.log(error.response.data.error);
      console.error('Error:', error.message);
    }
  };
  return (
    <div className='wrapper'>
      <div className='title-text'>
        {isLogin && <div className='title'>Login Form</div>}
        {!isLogin && <div className='title'>Signup Form</div>}
      </div>
      <div className='form-container'>
        <div className='slide-controls'>
          <input
            type='radio'
            name='slide'
            id='login'
            checked={isLogin}
            readOnly
          />
          <input
            type='radio'
            name='slide'
            id='signup'
            checked={!isLogin}
            readOnly
          />
          <label
            htmlFor='login'
            className='slide login'
            onClick={handleLoginClick}
          >
            Login
          </label>
          <label
            htmlFor='signup'
            className='slide signup'
            onClick={handleSignupClick}
          >
            Signup
          </label>
          <div className='slider-tab'></div>
        </div>
        <div
          className='form-inner'
          style={{ marginLeft: isLogin ? '0%' : '-100%' }}
        >
          <form action='#' className='login' onSubmit={LoginFormSubmit}>
            <div className='field'>
              <input
                placeholder='Email Address'
                required
                value={emailID}
                onChange={(e) => setEmailID(e.target.value)}
                type='email'
                className='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
              />
            </div>
            <div className='field'>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className='form-control'
                id='exampleInputPassword1'
                name='password'
                required
              />
            </div>
            <div className='pass-link'>
              <a href='#'>Forgot password?</a>
            </div>
            <div className='field btn'>
              <div className='btn-layer'></div>
              <input type='submit' value='Login' />
            </div>
            <div className='signup-link'>
              Not a member?{' '}
              <a href='#' onClick={handleSignupLinkClick}>
                Signup now
              </a>
            </div>
          </form>
          <form action='#' className='signup'>
            <div className='field'>
              <input type='text' placeholder='Email Address' required />
            </div>
            <div className='field'>
              <input type='password' placeholder='Password' required />
            </div>
            <div className='field'>
              <input type='password' placeholder='Confirm password' required />
            </div>
            <div className='field btn'>
              <div className='btn-layer'></div>
              <input type='submit' value='Signup' />
            </div>
          </form>
        </div>
      </div>
      <div className='social-buttons'>
        <a href='#' className='socialButton facebook' target='_blank'>
          Facebook
        </a>
        <a href='#' className='socialButton twitter' target='_blank'>
          Twitter
        </a>
        <a href='#' className='socialButton googleplus' target='_blank'>
          Google
        </a>
      </div>
    </div>
  );
};

export default PlayerLogin;

{
  /* <div>
        <GoogleOAuthProvider clientId='18301589792-3k260e10rdgripqcukl2mrdhu2bti3c8.apps.googleusercontent.com'>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
          />
          ;
        </GoogleOAuthProvider>
        ;
      </div> */
}
