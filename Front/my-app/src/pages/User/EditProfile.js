import React, { useState, useEffect } from 'react';
import styles from './EditProfile.module.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    profile: '',
    emailID: '',
    password: '',
    mobileNumber: '',
    company: '',
    address: '',
    social_media_links: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
    },
  });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/user/profile`,
        { headers }
      );

      if (response.status < 200 || response.status > 300) {
        throw new Error('Failed to fetch profile data');
      }

      const data = response.data;
      setFormData(data);
      console.log('FormData:', formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      const response = await axios.put(
        `${process.env.REACT_APP_URL}api/user/updateProfile`,
        formData,
        {
          headers,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        return navigate('/user/profile');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      // setError(error.response?.data?.error || error.message);
    } finally {
      // setLoading(false);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profile: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div className={styles.containerEp}>
        <div className={styles.wrapper}>
          <div className={styles.profile}>
            <div className={styles.content}>
              <h1>Edit Profile</h1>
              <form onSubmit={handleSubmit}>
                {/* Photo */}
                <fieldset>
                  <div className={styles.grid35}>
                    <label htmlFor='avatar'>Your Photo</label>
                  </div>
                  <div className={styles.grid65}>
                    <span
                      className={styles.photo}
                      title='Upload your Avatar!'
                      style={{
                        backgroundImage: `url(${formData.profile})`,
                      }}
                    ></span>
                    <input
                      type='file'
                      className={styles.btn}
                      onChange={handleFileChange}
                    />
                  </div>
                </fieldset>

                {/* First Name */}
                <fieldset>
                  <div className={styles.grid35}>
                    <label htmlFor='fname'>Name</label>
                  </div>
                  <div className={styles.grid65}>
                    <input
                      type='text'
                      // id='fname'
                      value={formData.name || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                      }}
                      tabIndex='1'
                    />
                  </div>
                </fieldset>
                <fieldset>
                  <div className={styles.grid35}>
                    <label htmlFor='email'>Email Address</label>
                  </div>
                  <div className={styles.grid65}>
                    <input
                      type='email'
                      value={formData.emailID || ''}
                      tabIndex='6'
                    />
                  </div>
                </fieldset>

                {/* Location */}
                <fieldset>
                  <div className={styles.grid35}>
                    <label htmlFor='location'>Location</label>
                  </div>
                  <div className={styles.grid65}>
                    <input
                      type='text'
                      value={formData.address || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                      }}
                      tabIndex='4'
                    />
                  </div>
                </fieldset>
                {/* Company */}
                <fieldset>
                  <div className={styles.grid35}>
                    <label htmlFor='Company'>Company</label>
                  </div>
                  <div className={styles.grid65}>
                    <input
                      type='text'
                      value={formData.company || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, company: e.target.value });
                      }}
                      tabIndex='5'
                    />
                  </div>
                </fieldset>
                <fieldset>
                  <div className={styles.grid35}>
                    <label htmlFor='Mobileno'>Mobile Number</label>
                  </div>
                  <div className={styles.grid65}>
                    <input
                      type='text'
                      value={formData.mobileNumber || ''}
                      id='Mobileno'
                      tabIndex='5'
                    />
                  </div>
                </fieldset>
                <div
                  className={`${styles.Heading} ${styles.socialMediaHeading}`}
                >
                  <label>Social Media Links(Username)</label>
                </div>
                <fieldset>
                  <div className={styles.grid35}>
                    <label htmlFor='facebook'>Facebook</label>
                  </div>
                  <div className={styles.grid65}>
                    <input
                      type='text'
                      value={formData.social_media_links?.facebook || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          social_media_links: {
                            ...formData.social_media_links,
                            facebook: e.target.value,
                          },
                        });
                      }}
                      tabIndex='9'
                    />
                  </div>
                </fieldset>
                {/* Company Name */}
                <fieldset>
                  <div className={styles.grid35}>
                    <label htmlFor='twitter'>Twitter</label>
                  </div>
                  <div className={styles.grid65}>
                    <input
                      type='text'
                      id='twitter'
                      value={formData.social_media_links?.twitter || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          social_media_links: {
                            ...formData.social_media_links,
                            twitter: e.target.value,
                          },
                        });
                      }}
                      tabIndex='10'
                    />
                  </div>
                </fieldset>

                <fieldset>
                  <div className={styles.grid35}>
                    <label htmlFor='instagram'>Instagram</label>
                  </div>
                  <div className={styles.grid65}>
                    <input
                      type='text'
                      id='instagram'
                      value={formData.social_media_links?.instagram || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          social_media_links: {
                            ...formData.social_media_links,
                            instagram: e.target.value,
                          },
                        });
                      }}
                      tabIndex='11'
                    />
                  </div>
                </fieldset>

                <fieldset>
                  <div className={styles.grid35}>
                    <label htmlFor='youtube'>Youtube</label>
                  </div>
                  <div className={styles.grid65}>
                    <input
                      type='text'
                      id='youtube'
                      value={formData.social_media_links?.youtube || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          social_media_links: {
                            ...formData.social_media_links,
                            youtube: e.target.value,
                          },
                        });
                      }}
                      tabIndex='12'
                    />
                  </div>
                </fieldset>

                {/* GitHub URL */}

                {/* Buttons */}
                <div className={styles.Center1}>
                  <input
                    type='button'
                    className={`${styles.Btn} ${styles.cancel}`}
                    value='Cancel'
                  />
                  <input
                    type='submit'
                    className={styles.Btn}
                    value='Save Changes'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

{
  /* <fieldset>
                  <div className={styles.grid35}>
                    <label htmlFor='Company'>Company</label>
                  </div>
                  <div className={styles.grid65}>
                    <select id='Company' name='work' tabIndex='7'>
                      <option value='yes'>Yes</option>
                      <option value='no'>No</option>
                    </select>
                  </div>
                </fieldset> */
}

{
  /* <fieldset>

                  <div className={styles.grid35}>
                    <label htmlFor='description'>About you</label>
                  </div>
                  <div className={styles.grid65}>
                    <textarea
                      id='description'
                      rows='auto'
                      tabIndex='3'
                    ></textarea>
                  </div>
                </fieldset> */
}
