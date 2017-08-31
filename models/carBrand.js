const models = require('../models');

module.exports = function(sequelize, Sequelize) {

    var CarBrand = sequelize.define('CarBrand', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        carBrand: {
            type: Sequelize.STRING,
            allowNull: false
        }
      })
      CarBrand.associate = function (models) {
        CarBrand.hasOne(models.Car, {
         through: 'CarBrand',
         foreignKey: 'idBrand'
        })
      };      

    return CarBrand;

}
