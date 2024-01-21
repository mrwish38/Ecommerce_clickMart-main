const app = require("./app");
const { path } = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// Configure
require("dotenv").config({ path: "backend/config/config.env" });

// Connect to database
connectDatabase();
// Change this to a different port, e.g., const PORT = 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down The Server Due To Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
