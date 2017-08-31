const express = require('express');
var models = require('../models');
var Sequelize = require('sequelize');


const router = express.Router();



router.get('/getAllCars',function(req, res){
  models.Car.findAll({
  include: [
    { model: models.CarBrand, as: 'CarBrand'},
    { model: models.CarName, as: 'CarName'},
    { model: models.CarType, as: 'CarType'},
    { model: models.CarPriceCategory, as: 'CarPriceCategory'},
    { model: models.RegionSize, as: 'RegionSize'},
    { model: models.RegionName, as: 'RegionName'},
  ]})
  .then(function(cars){
    if(cars){
      res.send(cars);
    } else {
      console.log('cars not exists');
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(err);
  })
});

router.get('/getCar/:id',function(req, res){
  models.Car.findOne({ where: {id : req.params.id},
  include: [
    { model: models.CarBrand, as: 'CarBrand'},
    { model: models.CarName, as: 'CarName'},
    { model: models.CarType, as: 'CarType'},
    { model: models.CarPriceCategory, as: 'CarPriceCategory'},
    { model: models.RegionSize, as: 'RegionSize'},
    { model: models.RegionName, as: 'RegionName'}
  ]})
  .then(function(car){
    if(car){
      res.send(car);
    } else {
      console.log('car not exists');
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(err);
  })
});

router.get('/getAllTables',function(req, res){
  models.Car.findAll().then(function(cars){
    if(cars){
      res.send(cars);
    } else {
      console.log('cars not exists');
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(err);
  })
});

router.get('/carFinderTables',function(req, res){
  models.CarBrand.findAll().then(function(brands){
    if(brands){
      models.CarType.findAll().then(function(type){
        if(type){
          models.CarPriceCategory.findAll().then(function(priceCategory){
            if(priceCategory){
              var data = {brands, type, priceCategory};
              res.send(data);
            } else {
              console.log('priceCategory not exists');
            }
          })
        } else {
          console.log('(type not exists');
        }
      })
    } else {
      console.log('brands not exists');
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(err);
  })
});

router.get('/rentCarFormTables',function(req, res){
  models.InsuranceType.findAll().then(function(insurment){
    if(insurment){
      models.RegionSize.findAll().then(function(regionSize){
        if(regionSize){
          models.RegionName.findAll().then(function(regionName){
            if(regionName){
              var data = {insurment, regionSize, regionName};
              res.send(data);
            } else {
              console.log('regionName not exists');
            }
          })
        } else {
          console.log('regionSize not exists');
        }
      })
    } else {
      console.log('insurment not exists');
    }
  })
  .catch(function(err){
    console.log(err);
    res.send(err);
  })
});

router.get('/orderHistory',function(req, res){
  models.User.findOne({where: {username: req.session.username}}).then(function(user){
    if(user){
      models.Order.findAll({where: {idUser : user.id},
      include: [
        {model: models.Car, include: [
            { model: models.CarBrand, as: 'CarBrand'},
            { model: models.CarName, as: 'CarName'},
            { model: models.CarType, as: 'CarType'},
            { model: models.CarPriceCategory, as: 'CarPriceCategory'},
            { model: models.RegionSize, as: 'RegionSize'},
            { model: models.RegionName, as: 'RegionName'}
          ]},
        {model: models.InsuranceType},
        {model: models.RegionSize},
        {model: models.RegionName}
      ]})
      .then(function(orders){
        if(orders){
          res.send(orders);
        }
      })
    }
  })
});

router.post('/makeRentCar', function(req, res){
  models.User.findOne({where: {username: req.session.username}}).then(function(user){
    if(user){
      var userId = user.id;
      var today = new Date();
      var data = {
        idUser       : userId,
        idCar        : req.body.idCar,
        idRegionSize : req.body.regionSize,
        idRegionName : req.body.regionName,
        idInsurance  : req.body.insurment,
        price        : req.body.price,
        startServiceDate : req.body.startServ,
        endServiceDate   : req.body.endServ,
        orderTimeDate    : today,
        statusOrder      : "WAITED",
        description      : ""
      }
      models.Order.create(data).then(function(){
      })
    }
  })
  .error(function(err){
    console.log(err);
  })

});


module.exports = router;
