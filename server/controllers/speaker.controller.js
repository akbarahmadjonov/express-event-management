const { v4: uuid } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const speakerModel = require("../models/speaker.model");

exports.speaker = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../db/speakers.json");
    const fileContent = await fs.readFile(filePath, "utf-8");

    //* Gets values from request body
    const { image } = req.files;
    const { speaker_name, founder_of } = req.body;

    //* Checks if the image is valid
    if (!image) {
      return res.status(400).json({ message: "❌ Missing image file." });
    }

    const imageName = `${uuid()}.${image.mimetype.split("/")[1]}`;
    image.mv(`${process.cwd()}/uploads/${imageName}`);

    //* Parses the existing file content into an array of objects
    const existingData = JSON.parse(fileContent);

    //* Generates a new id for speakers

    //* If existingData length is greater than 0, we access the last element in the existingData, and we extract id using .id

    //* Then we add 1 to extracted id to generate a new id for speakers

    //* If existingData length is falsy(0) we assign the value 1 to an (id), this means the first speaker will be added to the existingData
    const id = existingData.length
      ? existingData[existingData.length - 1].id + 1
      : 1;

    //* Creates a new speaker model
    const newSpeaker = new speakerModel(
      id,
      imageName,
      speaker_name,
      founder_of
    );

    //* Adds the new speaker to the existing data
    existingData.push(newSpeaker);

    //* Writes the updated data to the file
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

    res.status(201).json({ message: "✅Successfully created speaker." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error - " + error.message });
  }
};

exports.getAllSpeakers = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../db/speakers.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error - " + error.message });
  }
};
