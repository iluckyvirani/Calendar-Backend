const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");

require("dotenv").config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", eventRoutes);

// module.exports = app; 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
