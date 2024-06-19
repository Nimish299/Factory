import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios'; // Assuming you're using Axios for HTTP requests

const ViewCard = () => {
  const { cardId } = useParams();
  const [CardData, setCardData] = useState({});
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
      setCardData(data); // Update form data with fetched card data
      console.log('FormData:', CardData); // Log fetched data for verification
    } catch (error) {
      console.error('Error fetching card data:', error);
      // Handle error, e.g., show error message to user
    }
  };
  return <div></div>;
};

export default ViewCard;
