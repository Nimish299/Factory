import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios'; // Assuming you're using Axios for HTTP requests
import { useNavigate, Link } from 'react-router-dom';
// import styles from './EditCard.module.css';
const EditCard = () => {
  const { cardId } = useParams(); // Extract cardId from URL params
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    logo: '',
    contact: {
      phone: '',
      email: '',
      address: '',
      website: '',
    },
    services: '',
    products: [],
    portfolio: [],
    testimonials: [],
    specialOffers: '',
    aboutUs: '',
    socialMediaLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
    },
  });

  useEffect(() => {
    fetchCard();
  }, [cardId]); // Fetch data when cardId changes or component mounts

  // Fetch card data on component mount
  const fetchCard = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };

      const response = await axios.get(`/api/user/card/${cardId}`, { headers });

      if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to fetch card data');
      }

      const data = response.data;
      setFormData(data); // Update form data with fetched card data
      console.log('FormData:', data); // Log fetched data for verification
    } catch (error) {
      console.error('Error fetching card data:', error);
      // Handle error, e.g., show error message to user
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      const response = await axios.put(
        `${process.env.REACT_APP_URL}api/user/updatecard/${cardId}`,
        formData,
        {
          headers,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        return navigate(`/card/${cardId} `);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  };
  return (
    <div>
      <h2>Edit Card</h2>
    </div>
  );
};

export default EditCard;
