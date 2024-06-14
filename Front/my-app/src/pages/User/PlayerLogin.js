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
  const [name, setName] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [mobileNumber, setmobileNumber] = useState('');
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function isValidPassword(password) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/;
    return passwordRegex.test(password);
  }
  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10,11}$/;
    return phoneRegex.test(phoneNumber);
  }
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
  const SignupFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validation checks
    if (name.length === 0) {
      return alert('Name should have at least one character');
    }
    if (!validateEmail(emailID)) {
      return alert('Please enter a valid email');
    }
    // if (!isValidPassword(password)) {
    //   return alert(
    //     'Password should have at least one digit, one special character, one letter, and a minimum length of 6 characters'
    //   );
    // }
    if (!isValidPhoneNumber(mobileNumber)) {
      return alert('Mobile number should have 10 digits');
    }

    if (cpassword === password) {
      const user = { name, emailID, password, mobileNumber };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}api/user/signup`,
          user,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const json = response.data;

        if (response.status >= 200 && response.status < 300) {
          const { token } = json;

          console.log('Frontend token:', token);
          localStorage.setItem('auth-token', token);
          axios.defaults.headers.common['Authorization'] = token;
          // Navigate to home or another page
          // navigate('/player/home');
        } else {
          console.error('Error:', json.error);
          // alert(json.error);
        }
      } catch (error) {
        console.error(
          'Error:',
          error.response ? error.response.data.error : error.message
        );
        // alert(error.response ? error.response.data.error : error.message);
      }
    } else {
      return alert('Passwords do not match');
    }
  };

  const LoginFormSubmit = async (e) => {
    e.preventDefault();
    const user = { emailID, password };
    setEmailID('');
    setPassword('');
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
          <form action='#' className='signup' onSubmit={SignupFormSubmit}>
            <div className='field'>
              <input
                type='text'
                className='form-control'
                id='name'
                aria-describedby='emailHelp'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter name'
                required
              />
            </div>
            <div className='field'>
              <input
                placeholder='Email Address'
                type='email'
                className='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                value={emailID}
                onChange={(e) => setEmailID(e.target.value)}
                required
              />
            </div>
            <div className='field'>
              <input
                type='password'
                placeholder='Password'
                className='form-control'
                id='exampleInputPassword1'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label='At least 5 digits or characters'
                required
              />
            </div>
            <div className='field'>
              <input
                type='password'
                placeholder='Confirm password'
                className='form-control'
                id='exampleInputPassword1'
                value={cpassword}
                onChange={(e) => {
                  setCpassword(e.target.value);
                }}
                required
              />
            </div>
            <div className='field'>
              <input
                type='tel' // Set type to 'tel' for mobile numbers
                className='form-control'
                id='mobileNumber'
                aria-describedby='mobileNumberHelp'
                value={mobileNumber}
                onChange={(e) => setmobileNumber(e.target.value)}
                placeholder='Enter mobile number - 10 digits'
                required
              />
            </div>
            <div className='field btn'>
              <div className='btn-layer'></div>
              <input type='submit' value='Signup' />
            </div>
          </form>
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
