const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61250e0fa3d44d36201ca039",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dvszgrlmv/image/upload/v1629917919/YelpCamp/dglpxfxlo5xazfj2esii.jpg",
          filename: "YelpCamp/dglpxfxlo5xazfj2esii",
        },
        {
          url: "https://res.cloudinary.com/dvszgrlmv/image/upload/v1629917919/YelpCamp/zo022xbsj9l3ytme4lbp.jpg",
          filename: "YelpCamp/zo022xbsj9l3ytme4lbp",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum dicta, modi, ut ipsa inventore provident accusamus id hic eveniet illo praesentium velit quo. Eius autem iusto modi consequuntur, ullam quidem.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude,
        ]
    },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
