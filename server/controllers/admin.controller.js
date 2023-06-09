const fs = require("fs/promises");
const path = require("path");

exports.admin = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../db/admin.json");
    console.log(filePath); // Log the file path for debugging purposes
    const fileContent = await fs.readFile(filePath, "utf-8");

    const { username, password } = req.body;

    const admin = JSON.parse(fileContent);

    const findAdmin = admin.find(
      (admin) => admin.username === username && admin.password === password
    );
    console.log(findAdmin); // Log the found admin object for debugging purposes

    if (!findAdmin) {
      // If admin is not found, return a 404 error response with a JSON message
      return res.status(404).json({
        message: "Incorrect username or password provided",
      });
    }

    // If admin is found, return a success response with a JSON object
    res.status(200).json({ success: true });
  } catch (error) {
    // If an error occurs, return a 400 error response with a JSON message
    res.status(400).json({ message: "Not found with status" });
  }
};
