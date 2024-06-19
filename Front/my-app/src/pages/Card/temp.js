import React, { useState } from 'react';
import styles from './YourComponent.module.css'; // Ensure you have the correct path to your CSS module

const YourComponent = () => {
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
    additionalImages: [], // Initialize as an empty array
    testimonials: [],
    specialOffers: '',
    aboutUs: '',
    socialMediaLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
    },
    location: {
      type: 'Point',
      coordinates: [], // Initialize as an empty array
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (e) => {
    const { name, value } = e.target;
    const [nestedField, nestedKey] = name.split('.');

    setFormData((prevFormData) => ({
      ...prevFormData,
      [nestedField]: {
        ...prevFormData[nestedField],
        [nestedKey]: value,
      },
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    const index = name === 'longitude' ? 0 : 1;
    const coordinates = [...formData.location.coordinates];
    coordinates[index] = parseFloat(value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      location: {
        ...prevFormData.location,
        coordinates,
      },
    }));
  };

  const handleAdditionalImagesChange = (index, value) => {
    const updatedImages = [...formData.additionalImages];
    updatedImages[index] = value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      additionalImages: updatedImages,
    }));
  };

  const addAdditionalImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      additionalImages: [...prevFormData.additionalImages, ''],
    }));
  };

  const removeAdditionalImage = (index) => {
    const updatedImages = [...formData.additionalImages];
    updatedImages.splice(index, 1);

    setFormData((prevFormData) => ({
      ...prevFormData,
      additionalImages: updatedImages,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="companyName">Company Name</label>
        </div>
        <div className={styles.grid65}>
          <input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            tabIndex="1"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="avatar">LOGO</label>
        </div>
        <div className={styles.grid65}>
          <span
            className={styles.photo}
            title="Upload your Image!"
            style={{
              backgroundImage: `url(${formData.logo})`,
            }}
          ></span>
          <input
            type="file"
            className={styles.btn}
            onChange={handleFileChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="phone">Company Phone Number</label>
        </div>
        <div className={styles.grid65}>
          <input
            type="text"
            id="phone"
            value={formData.contact.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: { ...formData.contact, phone: e.target.value },
              })
            }
            tabIndex="2"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="email">Company Email</label>
        </div>
        <div className={styles.grid65}>
          <input
            type="email"
            id="email"
            value={formData.contact.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: { ...formData.contact, email: e.target.value },
              })
            }
            tabIndex="3"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="address">Company Address</label>
        </div>
        <div className={styles.grid65}>
          <textarea
            type="text"
            id="address"
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
            tabIndex="4"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="website">Company Website</label>
        </div>
        <div className={styles.grid65}>
          <input
            type="url"
            id="website"
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
            tabIndex="5"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="services">Company Services</label>
        </div>
        <div className={styles.grid65}>
          <input
            type="text"
            id="services"
            value={formData.services}
            onChange={(e) =>
              setFormData({ ...formData, services: e.target.value })
            }
            tabIndex="6"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="aboutUs">About Us</label>
        </div>
        <div className={styles.grid65}>
          <textarea
            id="aboutUs"
            value={formData.aboutUs}
            onChange={(e) =>
              setFormData({ ...formData, aboutUs: e.target.value })
            }
            tabIndex="7"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="facebook">Facebook</label>
        </div>
        <div className={styles.grid65}>
          <input
            type="text"
            id="facebook"
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
            tabIndex="8"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="twitter">Twitter</label>
        </div>
        <div className={styles.grid65}>
          <input
            type="text"
            id="twitter"
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
            tabIndex="9"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="instagram">Instagram</label>
        </div>
        <div className={styles.grid65}>
          <input
            type="text"
            id="instagram"
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
            tabIndex="10"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label>Additional Images</label>
        </div>
        <div className={styles.grid65}>
          {formData.additionalImages.map((image, index) => (
            <div key={index} className={styles.imageField}>
              <input
                type="text"
                value={image}
                onChange={(e) => handleAdditionalImagesChange(index, e.target.value)}
                tabIndex={11 + index}
              />
              <button type="button" onClick={() => removeAdditionalImage(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addAdditionalImage} className={styles.btn}>
            Add Image
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="longitude">Longitude</label>
        </div>
        <div className={styles.grid65}>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={formData.location.coordinates[0] || ''}
            onChange={handleLocationChange}
            tabIndex="11"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className={styles.grid35}>
          <label htmlFor="latitude">Latitude</label>
        </div>
        <div className={styles.grid65}>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={formData.location.coordinates[1] || ''}
            onChange={handleLocationChange}
            tabIndex="12"
          />
        </div>
      </fieldset>
      <button type="submit" className={styles.btn}>
        Submit
      </button>
    </form>
  );
};

export default YourComponent;
