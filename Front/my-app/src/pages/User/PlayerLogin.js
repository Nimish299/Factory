import React, { useState } from 'react';
import PlayerLoginCSS from './playerLogin.module.css'; // Ensure you have appropriate CSS styles
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PlayerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    if (!isValidPhoneNumber(mobileNumber)) {
      return alert('Mobile number should have 10 or 11 digits');
    }

    if (cpassword === password) {
      try {
        const user = { name, emailID, password, mobileNumber };
        const response = await axios.post(
          `${process.env.REACT_APP_URL}api/user/signup`,
          user,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const { token } = response.data;
        localStorage.setItem('auth-token', token);
        axios.defaults.headers.common['Authorization'] = token;
        navigate('/');
      } catch (error) {
        console.error(
          'Error:',
          error.response ? error.response.data.error : error.message
        );
        alert(error.response ? error.response.data.error : error.message);
      }
    } else {
      return alert('Passwords do not match');
    }
  };

  const LoginFormSubmit = async (e) => {
    e.preventDefault();
    const user = { emailID, password };

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

      const { token } = response.data;
      axios.defaults.headers.common['Authorization'] = token;
      localStorage.setItem('auth-token', token);
      navigate('/');
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data.error : error.message
      );
      alert(error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <div className={PlayerLoginCSS.con}>
      <div className={PlayerLoginCSS.wrapper}>
        <div className={PlayerLoginCSS['title-text']}>
          {isLogin && <div className={PlayerLoginCSS.title}>Login Form</div>}
          {!isLogin && <div className={PlayerLoginCSS.title}>Signup Form</div>}
        </div>
        <div className={PlayerLoginCSS['form-container']}>
          <div className={PlayerLoginCSS['slide-controls']}>
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
              className={`${PlayerLoginCSS.slide} ${PlayerLoginCSS.login}`}
              onClick={handleLoginClick}
            >
              Login
            </label>
            <label
              htmlFor='signup'
              className={`${PlayerLoginCSS.slide} ${PlayerLoginCSS.signup}`}
              onClick={handleSignupClick}
            >
              Signup
            </label>
            <div className={PlayerLoginCSS['slider-tab']}></div>
          </div>
          <div
            className={PlayerLoginCSS['form-inner']}
            style={{ marginLeft: isLogin ? '0%' : '-100%' }}
          >
            <form className={PlayerLoginCSS.login} onSubmit={LoginFormSubmit}>
              <div className={PlayerLoginCSS.field}>
                <input
                  placeholder='Email Address'
                  required
                  value={emailID}
                  onChange={(e) => setEmailID(e.target.value)}
                  type='email'
                  className={PlayerLoginCSS['form-control']}
                />
              </div>
              <div className={PlayerLoginCSS.field}>
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={PlayerLoginCSS['form-control']}
                  required
                />
              </div>
              <div className={PlayerLoginCSS['pass-link']}>
                <Link to='#'>Forgot password?</Link>
              </div>
              <div className={PlayerLoginCSS.field}>
                <div className={PlayerLoginCSS['btn-layer']}></div>
                <input type='submit' value='Login' />
              </div>
              <div className={PlayerLoginCSS['signup-link']}>
                Not a member?{' '}
                <Link to='#' onClick={handleSignupLinkClick}>
                  Signup now
                </Link>
              </div>
            </form>
            <form className={PlayerLoginCSS.signup} onSubmit={SignupFormSubmit}>
              <div className={PlayerLoginCSS.field}>
                <input
                  type='text'
                  className={PlayerLoginCSS['form-control']}
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={PlayerLoginCSS.field}>
                <input
                  placeholder='Email Address'
                  type='email'
                  className={PlayerLoginCSS['form-control']}
                  value={emailID}
                  onChange={(e) => setEmailID(e.target.value)}
                  required
                />
              </div>
              <div className={PlayerLoginCSS.field}>
                <input
                  type='password'
                  placeholder='Password'
                  className={PlayerLoginCSS['form-control']}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className={PlayerLoginCSS.field}>
                <input
                  type='password'
                  placeholder='Confirm password'
                  className={PlayerLoginCSS['form-control']}
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  required
                />
              </div>
              <div className={PlayerLoginCSS.field}>
                <input
                  type='tel'
                  className={PlayerLoginCSS['form-control']}
                  placeholder='Enter mobile number - 10 digits'
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
              <div className={PlayerLoginCSS.field}>
                <div className={PlayerLoginCSS['btn-layer']}></div>
                <input type='submit' value='Signup' />
              </div>
            </form>
          </div>
          <div className={PlayerLoginCSS['social-buttons']}>
            <Link
              to='#'
              className={`${PlayerLoginCSS.socialButton} ${PlayerLoginCSS.facebook}`}
              target='_blank'
            >
              Facebook
            </Link>
            <Link
              to='#'
              className={`${PlayerLoginCSS.socialButton} ${PlayerLoginCSS.twitter}`}
              target='_blank'
            >
              Twitter
            </Link>
            <Link
              to='#'
              className={`${PlayerLoginCSS.socialButton} ${PlayerLoginCSS.googleplus}`}
              target='_blank'
            >
              Google
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerLogin;
