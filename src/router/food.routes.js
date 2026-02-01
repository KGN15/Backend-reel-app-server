const express = require("express");
const router = express.Router();

const { authFoodPartnerMiddlewares, authUserMiddlewares } = require("../middlewares/auth.middlewares");
const { createFood, getFoodIteam, likeFood, saveFood, getSaveFood } = require("../controllers/food.controller");
const upload = require("../multer/file.data.multer");

// CREATE FOOD (food partner only)
router.post(
    "/",
    authFoodPartnerMiddlewares,
    upload.single("vidio"),
    createFood
);

// GET FOOD (user only)
router.get(
    "/",
    authUserMiddlewares,
    getFoodIteam
);

router.post(
    '/like',
    authUserMiddlewares,
    likeFood
);

router.post(
    '/save',
    authUserMiddlewares,
    saveFood
)


router.get(
    '/save',
    authUserMiddlewares,
    getSaveFood,
)

module.exports = router;
