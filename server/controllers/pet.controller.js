let path = require('path');
let fs = require('fs');
const PetModel = require('../models/pet.model');

module.exports = {
  registerFoundPet,
  registerLostPet,
  getAllPets,
  getPet,
}

async function getAllPets(req, res) {
  try {
    let pets = await PetModel.find({});
    res.json({status: "success", pets: pets});
  } catch (e) {
    res.json({status: "failed"});
  }
}
async function getPet(req, res) {
  try {
    let id = req.body.id;
    let pet = await PetModel.findOne({id: id});
    res.json({status: "success", pet: pet});
  } catch (e) {
    res.json({status: "failed"});
  }
}
async function registerFoundPet(req, res) {
  try {
    let user = req.user;

    let photo_urls =[];
    let gallery = req.body.gallery;
    if (!gallery) return res.json({status: 'failed'});

    let public_path = path.resolve('dist/assets/pet_photos');
    if (!fs.existsSync(public_path)){
      fs.mkdirSync(public_path);
    }

    for (let i = 0; i < gallery.length; i++)
    {
      let pet_photo = gallery[i].preview.replace(/^data:image\/\w+;base64,/, "");
      let file_extension = '.png';
      if (pet_photo.charAt(0) === '/') file_extension = '.jpg';
      else if (pet_photo.charAt(0) === 'R') file_extension = '.gif';

      let petPhotoPath = '/pet_' + Math.random() + file_extension;
      let petPhotoUploadPath = public_path + petPhotoPath;
      fs.writeFileSync(petPhotoUploadPath, pet_photo, 'base64');
      photo_urls.push('/assets/pet_photos' + petPhotoPath);
    }


    let petFound = new PetModel({
      userId: user.id,
      petName: req.body.petName,
      collarTagDescription: req.body.collarTagDescription,
      petType: req.body.petType.name,
      desexed: req.body.desexed.name,
      breed: req.body.breed.name,
      colour: req.body.colour.name,
      age: req.body.age,
      ageUnit: req.body.ageUnit.name,
      size: req.body.size.name,
      gender: req.body.gender.name,
      microchipped: req.body.microchipped.name,
      microchipNumber: req.body.microchipNumber,
      reward: req.body.reward,
      date: req.body.dateFound,
      foundLost: 'Found',
      desc: req.body.desc,
      gallery: photo_urls,

      lat: req.body.lat,
      lng: req.body.lng,
      location: req.body.location,
    });

    await petFound.save();
    res.json({status: "success"});

  } catch (e) {
    res.json({status: "failed"});
  }
}

async function registerLostPet(req, res) {
  try {
    let user = req.user;

    let photo_urls =[];
    let gallery = req.body.gallery;
    if (!gallery) return res.json({status: 'failed'});

    let public_path = path.resolve('dist/assets/pet_photos');
    if (!fs.existsSync(public_path)){
      fs.mkdirSync(public_path);
    }

    for (let i = 0; i < gallery.length; i++)
    {
      let pet_photo = gallery[i].preview.replace(/^data:image\/\w+;base64,/, "");
      let file_extension = '.png';
      if (pet_photo.charAt(0) === '/') file_extension = '.jpg';
      else if (pet_photo.charAt(0) === 'R') file_extension = '.gif';

      let petPhotoPath = '/pet_' + Math.random() + file_extension;
      let petPhotoUploadPath = public_path + petPhotoPath;
      fs.writeFileSync(petPhotoUploadPath, pet_photo, 'base64');
      photo_urls.push('/assets/pet_photos' + petPhotoPath);
    }


    let petLost = new PetModel({
      userId: user.id,
      petName: req.body.petName,
      collarTagDescription: req.body.collarTagDescription,
      petType: req.body.petType.name,
      desexed: req.body.desexed.name,
      breed: req.body.breed.name,
      colour: req.body.colour.name,
      age: req.body.age,
      ageUnit: req.body.ageUnit.name,
      size: req.body.size.name,
      gender: req.body.gender.name,
      microchipped: req.body.microchipped.name,
      microchipNumber: req.body.microchipNumber,
      reward: req.body.reward,
      date: req.body.dateMissing,
      foundLost: 'Lost',
      desc: req.body.desc,
      gallery: photo_urls,

      lat: req.body.lat,
      lng: req.body.lng,
      location: req.body.location,
    });

    await petLost.save();
    res.json({status: "success"});

  } catch (e) {
    res.json({status: "failed"});
  }
}
