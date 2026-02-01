const express = require('express')
const router = express.Router()
const {authUserMiddlewares, authFoodPartnerMiddlewares} = require('../middlewares/auth.middlewares')
const { registerUser, loginUser, logoutUser, registarFoodPartner, loginFoodPartner, logoutFoodPartner } = require('../controllers/auth.controller')

// user router APIs 
router.post('/user/register', registerUser)
router.post('/user/login', loginUser)
router.get('/user/logout', logoutUser)

// food partner router APIs
router.post('/food-partner/register', registarFoodPartner)
router.post('/food-partner/login', loginFoodPartner)
router.get('/food-partner/logout', logoutFoodPartner)

router.get('/check/user', authUserMiddlewares, (req, res) => {
   res.json({ ok: true, user: req.user });
})

router.get("/check/food-partner", authFoodPartnerMiddlewares, (req, res) => {
  res.json({ ok: true, role: "food-partner", foodPartner: req.foodPartner });
});

module.exports = router;