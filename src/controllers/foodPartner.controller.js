const foodPartnerModel = require('../models/foodPartner.model');
const foodModel = require('../models/food.model')


const getFoodPartnerByID = async (req, res) => {
  try {
    const foodPartnerID = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerID);
    const foodIteamByFoodPartner = await foodModel.find({foodPartner: foodPartnerID})

    

    if (!foodPartner) {
      return res.status(404).json({
        message: 'Food Partner Not Found'
      });
    }

    res.status(200).json({
      message: 'Food Partner Found',
      foodPartner:{
        ...foodPartner.toObject(),
        foodIteam: foodIteamByFoodPartner
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

module.exports = { getFoodPartnerByID };
