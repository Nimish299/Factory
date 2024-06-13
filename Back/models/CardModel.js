const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true },
    logo: { type: String }, // URL to the company's logo image
    contact: {
      phone: { type: String },
      email: { type: String },
      address: { type: String },
      website: { type: String },
    },
    services: { type: String }, // Description of services offered
    products: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        // You can add more fields as needed for each product
      },
    ],
    portfolio: [{ type: String }], // URLs to images of completed projects
    testimonials: [{ type: String }], // Testimonials or reviews
    specialOffers: { type: String }, // Description of special offers or promotions
    aboutUs: { type: String }, // Brief overview of the business
    views: { type: Number, default: 0 },
    socialMediaLinks: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
    faqs: [{ question: { type: String }, answer: { type: String } }], // FAQs
    // You can include other fields like timestamps, visibility settings, etc. as needed
  },

  { timestamps: true }
);

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
