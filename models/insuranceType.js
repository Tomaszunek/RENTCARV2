const models = require('../models');

module.exports = function(sequelize, Sequelize) {

    var InsuranceType = sequelize.define('InsuranceType', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        insuranceName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        insurancePrice: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
      })
      InsuranceType.associate = function (models) {
        InsuranceType.hasOne(models.Order, {
         through: 'InsuranceType',
         foreignKey: 'idInsurance'
        })
      };

    return InsuranceType;

}
