import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import imgrouter from "./routes/Img-routes.js";


const app = express();

app.use(express.json());
app.use("/api/User",router);
app.use("/api/img",imgrouter);
// MongoDB connection string
const mongoURI = "mongodb+srv://admin:admin123@cluster0.sgdfyyf.mongodb.net/";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    
    // Start Express server
    app.listen(5001, () => {
        console.log("Server is running on port 5001");
      });
      
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });
