const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const config = require('../config/config');
const petCtrl = require('../controllers/pet.controller');


const router = express.Router();

module.exports = router;

router.post('/get-all-pets', asyncHandler(getAllPets));
router.post('/get-pet', asyncHandler(getPet));
router.post('/register-foundpet', passport.authenticate('jwt', { session: false }), asyncHandler(registerFoundPet));
router.post('/register-lostpet', passport.authenticate('jwt', { session: false }), asyncHandler(registerLostPet));

async function getAllPets(req, res) {
  await petCtrl.getAllPets(req, res);
}
async function getPet(req, res) {
  await petCtrl.getPet(req, res);
}
async function registerFoundPet(req, res) {
  await petCtrl.registerFoundPet(req, res);
}
async function registerLostPet(req, res) {
  await petCtrl.registerLostPet(req, res);
}
