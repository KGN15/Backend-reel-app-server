const express = require("express");
const router = express.Router();

const authMiddlewares = require("../middlewares/auth.middlewares");
const {getFoodPartnerByID} = require('../controllers/foodPartner.controller')



router.get(
    "/:id",
    authMiddlewares.authUserMiddlewares,
    getFoodPartnerByID,
);



module.exports = router;
