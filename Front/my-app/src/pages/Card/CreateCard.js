import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CreateCard.module.css';
import { useNavigate, Link } from 'react-router-dom';
const API = '7dbd749f2cb15bf3ad051b00779ed6e0';
const CreateCard = () => {
  const [formData, setFormData] = useState({
    companyName: '', //d
    logo: '', //d
    contact: {
      //d
      phone: '',
      email: '',
      address: '',
      website: '',
    },
    services: '', //d
    products: [],
    portfolio: [],
    testimonials: [],
    specialOffers: '',
    aboutUs: '', //d
    socialMediaLinks: {
      //d
      facebook: '',
      twitter: '',
      instagram: '',
    },
    location: {
      type: 'Point',
      coordinates: [],
    },
  });
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [error, setError] = useState(null);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log('Latitude:', lat);
          console.log('Longitude:', lon);
          setLatitude(lat);
          setLongitude(lon);
          setFormData({
            ...formData,
            location: {
              type: 'Point',
              coordinates: [lon, lat], // MongoDB expects coordinates in [longitude, latitude] order
            },
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          setError('Error getting geolocation');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const navigate = useNavigate();
  const createCard = async (cardData) => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      const response = await axios.post(
        `${process.env.REACT_APP_URL}api/user/createCard`,
        cardData,
        { headers }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log('Card created successfully:', response.data);
        return response.data;
      } else {
        throw new Error('Failed to create card');
      }
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCard(formData);
    return navigate('/');
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setFormData({ ...formData, logo: reader.result });

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'factory_profile');
        data.append('cloud_name', 'dl2hymwdr');

        try {
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dl2hymwdr/image/upload',
            data
          );
          setFormData({ ...formData, logo: response.data.secure_url });
          console.log('Image uploaded successfully:', response.data);
        } catch (err) {
          console.error('Error uploading image:', err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStatistic = () => {
    // Function to add a new product to the products array
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        { name: '', price: 0, description: '', image: null },
      ], // Initialize new product object with name, price, description, and image (initially null)
    });
  };
  const handleDeleteStatistic = (index) => {
    // Function to delete a product from the products array
    const updatedFormData = [...formData.products]; // Make a copy of the products array
    updatedFormData.splice(index, 1); // Remove the product at the specified index
    setFormData({ ...formData, products: updatedFormData }); // Update state with the updated products array
  };
  const handleImageChangeProduct = async (index, e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const formDataCopy = { ...formData }; // Create a copy of formData

      // Use FileReader to read the file as data URL asynchronously
      const reader = new FileReader();
      reader.onloadend = async () => {
        // Update the product's image field with the data URL
        formDataCopy.products[index].image = reader.result;
        setFormData(formDataCopy); // Update state with the updated formData

        // Prepare formData for uploading to Cloudinary
        const data = new FormData();
        data.append('file', file); // Append the file to FormData
        data.append('upload_preset', 'factory_profile'); // Your Cloudinary upload preset
        data.append('cloud_name', 'dl2hymwdr'); // Your Cloudinary cloud name

        try {
          // Send POST request to Cloudinary API for image upload
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dl2hymwdr/image/upload',
            data
          );

          // Update the product's image field with the secure URL from Cloudinary
          formDataCopy.products[index].image = response.data.secure_url;
          setFormData(formDataCopy); // Update state with the updated formData

          console.log('Image uploaded successfully:', response.data);
        } catch (err) {
          console.error('Error uploading image:', err);
        }
      };

      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  const handlePortfolioImageChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const formDataCopy = { ...formData };

      const reader = new FileReader();
      reader.onloadend = async () => {
        // Update the specific portfolio item at the given index with the file's data URL
        formDataCopy.portfolio[index] = { image: reader.result };
        setFormData(formDataCopy);

        // Prepare FormData for uploading to Cloudinary
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'factory_profile'); // Adjust upload preset for portfolio images
        data.append('cloud_name', 'dl2hymwdr'); // Your Cloudinary cloud name

        try {
          // Send POST request to Cloudinary API for image upload
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dl2hymwdr/image/upload',
            data
          );

          // Update the specific portfolio item at the given index with the secure URL from Cloudinary
          formDataCopy.portfolio[index] = { image: response.data.secure_url };
          setFormData(formDataCopy);

          console.log('Portfolio image uploaded successfully:', response.data);
        } catch (err) {
          console.error('Error uploading portfolio image:', err);
        }
      };

      reader.readAsDataURL(file); // Read the file as data URL
    }
  };
  const gotohome = () => {
    return navigate('/');
  };

  const handleRemovePortfolioImage = (index) => {
    const formDataCopy = { ...formData };
    formDataCopy.portfolio.splice(index, 1); // Remove the portfolio item at the given index
    setFormData(formDataCopy);
  };

  const handleAddPortfolioImage = () => {
    // Add an empty object to the portfolio array to render a new input for uploading an image
    setFormData({
      ...formData,
      portfolio: [...formData.portfolio, { image: '' }],
    });
  };

  return (
    <div className={styles.containerEp}>
      <div className={styles.wrapper}>
        <div className={styles.profile}>
          <div className={styles.content}>
            <h1>CARD</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className={styles.grid35}>
                  <label htmlFor='companyName'>Company Name</label>
                </div>
                <div className={styles.grid65}>
                  <input
                    type='text'
                    id='companyName'
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    tabIndex='1'
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.grid35}>
                  <label htmlFor='avatar'>LOGO</label>
                </div>
                <div className={styles.grid65}>
                  {formData.logo && (
                    <span
                      className={styles.photo}
                      title='Upload your Image!'
                      style={{
                        backgroundImage: `url(${formData.logo})`,
                      }}
                    ></span>
                  )}
                  <input
                    type='file'
                    // className={styles.btn}
                    onChange={handleFileChange}
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.grid35}>
                  <label htmlFor='phone'>Company Phone Number</label>
                </div>
                <div className={styles.grid65}>
                  <input
                    type='text'
                    id='phone'
                    value={formData.contact.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, phone: e.target.value },
                      })
                    }
                    tabIndex='2'
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.grid35}>
                  <label htmlFor='email'>Company Email</label>
                </div>
                <div className={styles.grid65}>
                  <input
                    type='email'
                    id='email'
                    value={formData.contact.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value },
                      })
                    }
                    tabIndex='3'
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.grid35}>
                  <label htmlFor='address'>Company Address</label>
                </div>
                <div className={styles.grid65}>
                  <textarea
                    type='text'
                    id='address'
                    value={formData.contact.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: {
                          ...formData.contact,
                          address: e.target.value,
                        },
                      })
                    }
                    tabIndex='4'
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.grid35}>
                  <label htmlFor='website'>Company Website</label>
                </div>
                <div className={styles.grid65}>
                  <input
                    type='url'
                    id='website'
                    value={formData.contact.website}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: {
                          ...formData.contact,
                          website: e.target.value,
                        },
                      })
                    }
                    tabIndex='5'
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.grid35}>
                  <label htmlFor='services'>Company Services</label>
                </div>
                <div className={styles.grid65}>
                  <input
                    type='text'
                    id='services'
                    value={formData.services}
                    onChange={(e) =>
                      setFormData({ ...formData, services: e.target.value })
                    }
                    tabIndex='1'
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.grid35}>
                  <label htmlFor='aboutUs'>About Us</label>{' '}
                  {/* Added fieldset for aboutUs */}
                </div>
                <div className={styles.grid65}>
                  <textarea
                    id='aboutUs'
                    value={formData.aboutUs}
                    onChange={(e) =>
                      setFormData({ ...formData, aboutUs: e.target.value })
                    }
                    tabIndex='6'
                  />
                </div>
              </fieldset>
              <fieldset>
                {formData.portfolio.map((item, index) => (
                  <fieldset key={index}>
                    <div className={styles.grid35}>
                      <label htmlFor={`portfolio.${index}`}>
                        Portfolio Image {index + 1}
                      </label>
                    </div>
                    <div className={styles.grid65}>
                      {item.image ? (
                        <div>
                          <span
                            className={styles.photo}
                            style={{ backgroundImage: `url(${item.image})` }}
                          ></span>
                          <button
                            type='button'
                            onClick={() => handleRemovePortfolioImage(index)}
                            className={styles.btn}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <input
                          type='file'
                          id={`portfolio.${index}`}
                          onChange={(e) => handlePortfolioImageChange(index, e)}
                          tabIndex={7 + index * 3} // Adjusted tabIndex to ensure uniqueness and order
                        />
                      )}
                    </div>
                  </fieldset>
                ))}
                <button
                  type='button'
                  onClick={handleAddPortfolioImage}
                  className={styles.btn}
                >
                  Add Portfolio Image
                </button>
              </fieldset>
              <fieldset>
                <div className={styles.grid35}>
                  <label htmlFor='facebook'>Facebook</label>{' '}
                  {/* Added fieldset for socialMediaLinks */}
                </div>
                <div className={styles.grid65}>
                  <input
                    type='text'
                    id='facebook'
                    value={formData.socialMediaLinks.facebook}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialMediaLinks: {
                          ...formData.socialMediaLinks,
                          facebook: e.target.value,
                        },
                      })
                    }
                    tabIndex='7'
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.grid35}>
                  <label htmlFor='twitter'>Twitter</label>
                </div>
                <div className={styles.grid65}>
                  <input
                    type='text'
                    id='twitter'
                    value={formData.socialMediaLinks.twitter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialMediaLinks: {
                          ...formData.socialMediaLinks,
                          twitter: e.target.value,
                        },
                      })
                    }
                    tabIndex='8'
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
                    value={formData.socialMediaLinks.instagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialMediaLinks: {
                          ...formData.socialMediaLinks,
                          instagram: e.target.value,
                        },
                      })
                    }
                    tabIndex='9'
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.grid35}>
                  <label htmlFor='Product'>Products</label>{' '}
                  {/* Label for products */}
                </div>

                <div className={styles.grid65}>
                  {formData.products.map(
                    (
                      product,
                      index // Map through products array to render each product
                    ) => (
                      <div key={index}>
                        <label>Product {index + 1}</label>{' '}
                        {/* Label for each product */}
                        <div className={styles.grid35}>
                          <label htmlFor='Name'>Name</label>
                        </div>
                        <div className={styles.grid65}>
                          <input
                            type='text'
                            id={`products.${index}.name`} // Unique id for input field (consider using a unique key for React, e.g., products.${index}.name)
                            value={product.name} // Value is bound to product name
                            onChange={(e) => {
                              const newProducts = [...formData.products]; // Create a copy of the products array
                              newProducts[index] = {
                                ...newProducts[index],
                                name: e.target.value,
                              }; // Update the name of the product at the specified index
                              setFormData({
                                ...formData,
                                products: newProducts, // Update state with the updated products array
                              });
                            }}
                            tabIndex={1 + index * 3} // Adjusted tabIndex to ensure uniqueness and order
                          />
                        </div>
                        <div className={styles.grid35}>
                          <label htmlFor='Price'>Price</label>
                        </div>{' '}
                        <div className={styles.grid65}>
                          <input
                            type='number'
                            id={`products.${index}.price`} // Unique id for price input field
                            value={product.price} // Value is bound to product price
                            onChange={(e) => {
                              const newProducts = [...formData.products]; // Create a copy of the products array
                              newProducts[index] = {
                                ...newProducts[index],
                                price: parseFloat(e.target.value),
                              }; // Update the price of the product at the specified index
                              setFormData({
                                ...formData,
                                products: newProducts, // Update state with the updated products array
                              });
                            }}
                            tabIndex={2 + index * 3} // Adjusted tabIndex to ensure uniqueness and order
                          />
                        </div>
                        <div className={styles.grid35}>
                          <label htmlFor='description'>Description</label>
                        </div>{' '}
                        <div className={styles.grid65}>
                          <textarea
                            id={`products.${index}.description`} // Unique id for description textarea
                            value={product.description} // Value is bound to product description
                            onChange={(e) => {
                              const newProducts = [...formData.products]; // Create a copy of the products array
                              newProducts[index] = {
                                ...newProducts[index],
                                description: e.target.value,
                              }; // Update the description of the product at the specified index
                              setFormData({
                                ...formData,
                                products: newProducts, // Update state with the updated products array
                              });
                            }}
                            tabIndex={3 + index * 3} // Adjusted tabIndex to ensure uniqueness and order
                          />
                        </div>
                        <div className={styles.grid35}>
                          <label htmlFor={`products.${index}.image`}>
                            Product Image
                          </label>
                        </div>
                        <div className={styles.grid65}>
                          {formData.products[index].image ? (
                            <span
                              className={styles.photo}
                              style={{
                                backgroundImage: `url(${formData.products[index].image})`,
                              }}
                            ></span>
                          ) : (
                            <input
                              type='file'
                              // className={styles.btn}
                              id={`products.${index}.image`}
                              onChange={(e) =>
                                handleImageChangeProduct(index, e)
                              }
                              tabIndex={4 + index * 4}
                            />
                          )}
                        </div>
                        <button
                          type='button'
                          onClick={() => handleDeleteStatistic(index)} // Button to delete the product at the current index
                          className={styles.btn}
                        >
                          Delete
                        </button>
                      </div>
                    )
                  )}
                  <button
                    type='button'
                    className={styles.btn}
                    onClick={handleAddStatistic}
                  >
                    Add Product
                  </button>
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.grid35}>
                  <label htmlFor='Location'>Location</label>
                  <p>Your current location is taken</p>
                </div>
                <div>
                  {error && <p>{error}</p>}
                  {latitude && longitude && (
                    <div>
                      <p>
                        Latitude: {latitude}, Longitude: {longitude}
                      </p>
                      <p>
                        <a
                          href={`https://www.google.com/maps/place/${latitude},${longitude}`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          View on Google Maps
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </fieldset>
              <button type='submit' className={styles.btn}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;

// const apiUrl = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=6673d20f3136b124066139ket0bd780`;

// axios
//   .get(apiUrl)
//   .then((response) => {
//     console.log('Address Data:', response.data);
//     setAddressData(response.data);
//   })
//   .catch((error) => {
//     console.error('Error fetching address data:', error);
//     setError('Error fetching address data');
//   });
