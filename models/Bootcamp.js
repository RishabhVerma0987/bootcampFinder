const mongoose = require("mongoose");
const Slugify = require("slugify");
const geocoder = require("../utils/geojsonDecoder.js");
const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
    unique: true,
    trim: true,
    maxlength: [50, "lenght cannot be more than 50"]
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Description cannot be empty"],
    maxlength: [500, "length cannot be more than 500"]
  },
  website: {
    type: String,
    match: [
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
      "Please provide a valid website name including http or https"
    ]
  },
  phone: {
    type: String,
    maxlength: [20, "Please enter a valid phone number"]
  },
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "plese enter a valid email"
    ]
  },
  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    //GeoJson Point
    type: {
      type: String,
      enum: ["Point"]
      // required: true
    },
    coordinates: {
      type: [Number],
      require: true,
      index: "2dsphere"
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  careers: {
    //Array of strings
    type: [String],
    required: true,
    //Only available value
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other"
    ]
  },
  averageRating: {
    type: Number,
    min: [1, "Rating cannot be less than 1"],
    max: [10, "Rating cannot be more than 10"]
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg"
  },
  housing: {
    type: Boolean,
    default: false
  },
  jobAssistance: {
    type: Boolean,
    default: false
  },
  jobGuarantee: {
    type: Boolean,
    default: false
  },
  acceptGi: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

BootcampSchema.pre("save", function(next) {
  this.slug = Slugify(this.name, { lower: true });
  next();
});

BootcampSchema.pre("save", async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].state,
    zipcode: loc[0].zipcode,
    country: loc[0].country
  };
  this.address = undefined;
  next();
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);
