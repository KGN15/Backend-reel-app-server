const foodModel = require('../models/food.model')
const likeModel = require('../models/likes.model')
const saveFoodModel = require('../models/save.model')
const storageService = require('../services/storage.service')
const { v4: uuidv4 } = require("uuid");


const createFood = async (req, res) => {
  try {
    if (!req.foodPartner) return res.status(401).json({ message: "Unauthorized" });
    if (!req.file) return res.status(400).json({ message: "Video is required" });

    console.log("FILE BUFFER SIZE:", req.file.buffer.length);

    const ext = req.file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;

    const uploadResult = await storageService.uploadFile(
      req.file.buffer,
      fileName
    );
    const videoURL = uploadResult.url;

    const food = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      vidio: videoURL,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({ success: true, food });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create food failed" });
  }
};


const getFoodIteam = async (req, res) => {
  const foodIteam = await foodModel.find({})
  res.status(200).json({
    message: 'Food Iteam Fached sucsessfully',
    foodIteam
  })
}

const likeFood = async (req, res) => {
  const { foodID } = req.body

  const user = req.user

  const isAlradyLiked = await likeModel.findOne({
    user: user._id,
    food: foodID,
  })

  if (isAlradyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodID,
    })

    await foodModel.findByIdAndUpdate(foodID, {
      $inc: { likeCount: -1 }
    })

    return res.status(200).json({
      message: 'Food Unliked Sucsessfully'
    })
  }

  const like = likeModel.create({
    user: user._id,
    food: foodID,
  })

  await foodModel.findByIdAndUpdate(foodID, {
    $inc: { likeCount: 1 }
  })

  res.status(201).json({
    message: 'Food liked Sucsessfully',
    like
  })
}

const saveFood = async (req, res) => {

  const { foodID } = req.body

  const user = req.user

  const isAlradysaved = await saveFoodModel.findOne({
    user: user._id,
    food: foodID,
  })

  if (isAlradysaved) {
    await saveFoodModel.deleteOne({
      user: user._id,
      food: foodID,
    })

    await foodModel.findByIdAndUpdate(foodID, {
      $inc: { savedCount: -1 }
    })

    return res.status(200).json({
      message: 'Food Unsaved Sucsessfully'
    })
  }

  const like = saveFoodModel.create({
    user: user._id,
    food: foodID,
  })

  await foodModel.findByIdAndUpdate(foodID, {
    $inc: { savedCount: 1 }
  })

  res.status(201).json({
    message: 'Food saved Sucsessfully',
    like
  })

}

const getSaveFood = async (req, res) => {
  const user = req.user;

  const saveFood = await saveFoodModel.find({ user: user._id }).populate('food');

  if (!saveFood || saveFood.length === 0) {
    return res.status(404).json({ massage: 'No saved Food Found.' })
  }

  res.status(200).json({
    message: 'Saved Food Fached Succsessfully',
    saveFood,
  })
}

module.exports = { createFood, getFoodIteam, likeFood, saveFood, getSaveFood }