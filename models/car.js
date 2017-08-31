const models = require('../models');

module.exports = function(sequelize, Sequelize) {

    var Car = sequelize.define('Car', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        idPhoto: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        idBrand: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        idName: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        idType: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        idPriceCategory: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        idRegionSize: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        idRegionName: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        yearProduction: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        mileage: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        horsePower: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        fuelOrGas: {
            type: Sequelize.ENUM('FUEL', 'GAS'),
            allowNull: false
        },

        countPerson: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    Car.associate = function (models) {
     Car.belongsTo(models.CarBrand, {
      through: 'CarBrand',
      foreignKey: 'idBrand'
     })

     Car.belongsTo(models.CarName, {
      through: 'CarName',
      foreignKey: 'idName'
     })

     Car.belongsTo(models.CarType, {
      through: 'CarType',
      foreignKey: 'idType'
     })

     Car.belongsTo(models.CarPriceCategory, {
      through: 'CarPriceCategory',
      foreignKey: 'idPriceCategory'
     })

     Car.belongsTo(models.RegionSize, {
      through: 'RegionSize',
      foreignKey: 'idRegionSize'
     })

     Car.belongsTo(models.RegionName, {
      through: 'RegionName',
      foreignKey: 'idRegionName'
     })

     Car.hasOne(models.Order, {
      through: 'CarOrder',
      foreignKey: 'idCar'
     })
    };
    return Car;

}
