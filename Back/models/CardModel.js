const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: { type: String, required: true },
    logo: { type: String },
    contact: {
      phone: { type: String },
      email: { type: String },
      address: { type: String },
      website: { type: String },
    },
    services: { type: String },
    products: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        image: { type: String, default: 'https://imgur.com/WJYZPy0.png' },
      },
    ],
    portfolio: [
      {
        image: { type: String, required: true },
      },
    ],
    additionalImages: [{ type: String }],
    testimonials: [{ type: String }],
    specialOffers: { type: String },
    aboutUs: { type: String },
    views: { type: Number, default: 0 },
    socialMediaLinks: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
    faqs: [{ question: { type: String }, answer: { type: String } }],
    seoMetaTags: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      metaKeywords: { type: [String] },
    },
    location: {
      type: { type: String, default: 'Point', enum: ['Point'] },
      coordinates: { type: [Number], index: '2dsphere' }, // GeoJSON format for coordinates [longitude, latitude]
    },
  },
  { timestamps: true }
);

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
