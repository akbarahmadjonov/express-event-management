require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("../routes");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/uploads"));
app.use(fileUpload());
app.use(routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
