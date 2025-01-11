const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");
const roastRoutes = require("./routes/roastRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('../roast-page/dist'));

app.use(roastRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../roast-page/dist', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
