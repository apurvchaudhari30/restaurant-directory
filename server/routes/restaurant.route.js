const express = require('express');
const router = express.Router();
const authMiddleware = require('../shared/verifyToken');
const restaurantController = require('../controllers/restaurant.controller');

router.post('/', authMiddleware,restaurantController.createRestaurant);
router.get('/', authMiddleware,restaurantController.getRestaurants);
router.get('/:id', authMiddleware,restaurantController.getRestaurantsById);
router.put('/:id',authMiddleware, restaurantController.updateRestaurant);
router.delete('/:id',authMiddleware, restaurantController.deleteRestaurant);

module.exports = router;
