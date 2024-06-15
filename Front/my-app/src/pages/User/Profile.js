import React from 'react';
import './profile.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    fetchProfile();
  }, []);
  const gotoprofile = () => {
    return navigate('/');
  };
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/user/profile`,
        {
          headers,
        }
      );
      if (response.status < 200 || response.status > 300) {
        throw new Error('Failed to fetch profile data');
      }
      const data = response.data;
      console.log(data);
      setProfileData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const formatTimestamp = (timestamp) => {
    const currentTime = new Date();
    const postTime = new Date(timestamp);
    const diff = currentTime - postTime;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      // If more than a day, show date
      return postTime.toLocaleDateString();
    } else if (hours > 0) {
      // If more than an hour, show hours ago
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      // If more than a minute, show minutes ago
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      // Otherwise, show seconds ago
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
  };
  return (
    <div>
      <div className='container mt-4 mb-4 p-3 d-flex justify-content-center'>
        <div className='card p-4'>
          <div className='image d-flex flex-column justify-content-center align-items-center'>
            <button className='btn btn-secondary'>
              <img
                src='https://i.imgur.com/wvxPV9S.png'
                height='100'
                width='100'
                alt='Profile'
              />
            </button>
            <br />
            <span className='name mt-3'>{profileData.name}</span>
            <br />
            <span className='idd'>{profileData.emailID}</span>
            <br />
            <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
              <span className='idd1'>{profileData.mobileNumber}</span>
              <span>
                <i className='fa fa-copy'></i>
              </span>
            </div>
            <br />
            <div className='d-flex flex-row justify-content-center align-items-center mt-3'>
              <span className='number'>
                1069 <span className='follow'>Views</span>
                {/* views */}
              </span>
            </div>
            <div className='d-flex mt-2'>
              <button className='btn1 btn-dark'>Edit Profile</button>
            </div>
            <div className='text mt-3'>
              <span>
                {profileData.company}
                <br />
                <br /> {profileData.address}
              </span>
            </div>
            <div className='gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center'>
              <div className='gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center'>
                {profileData.social_media_links && (
                  <>
                    {/* Twitter link */}
                    {profileData.social_media_links.twitter && (
                      <Link
                        // to={`https://twitter.com/${profileData.social_media_links.twitter}`}
                        target='_blank'
                        className='icon-link'
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </Link>
                    )}

                    {/* Facebook link */}
                    {profileData.social_media_links.facebook && (
                      <Link
                        to={`https://facebook.com/${profileData.social_media_links.facebook}`}
                        target='_blank'
                        className='icon-link'
                      >
                        <FontAwesomeIcon icon={faFacebook} />
                      </Link>
                    )}

                    {/* Instagram link */}
                    {profileData.social_media_links.instagram && (
                      <Link
                        to={`https://instagram.com/${profileData.social_media_links.instagram}`}
                        target='_blank'
                        className='icon-link'
                      >
                        <FontAwesomeIcon icon={faInstagram} />
                      </Link>
                    )}

                    {/* YouTube link */}
                    {profileData.social_media_links.youtube && (
                      <Link
                        to={`https://youtube.com/${profileData.social_media_links.youtube}`}
                        target='_blank'
                        className='icon-link'
                      >
                        <FontAwesomeIcon icon={faYoutube} />
                      </Link>
                    )}
                  </>
                )}
                {/* WhatsApp link */}
                {profileData.mobileNumber && (
                  <Link
                    to={`https://wa.me/${profileData.mobileNumber}`}
                    target='_blank'
                    className='icon-link'
                  >
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </Link>
                )}
              </div>
            </div>
            <div className='px-2 rounded mt-4 date'>
              <span className='join'>
                {formatTimestamp(profileData.createdAt)}
              </span>
            </div>
            <button className='btn1 btn-dark' onClick={gotoprofile}>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
