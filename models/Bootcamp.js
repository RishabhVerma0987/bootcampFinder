const mongoose = require("mongoose");

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
    type: Number,
    maxlength: [13, "Please enter a valid phone number"]
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
      enum: ["Point"],
      required: true
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
  carrers: {
    //Array of strings
    type: [String],
    required: true,
    //Only available value
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data science",
      "Buissness",
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

module.exports = mongoose.model("Bootcamp", BootcampSchema);
