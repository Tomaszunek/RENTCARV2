const models = require('../models');

module.exports = function(sequelize, Sequelize) {

    var Order = sequelize.define('Order', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        idUser: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        idCar: {
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

        idInsurance: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        startServiceDate: {
            type: Sequelize.DATE,
            allowNull: false
        },

        endServiceDate: {
            type: Sequelize.DATE,
            allowNull: false
        },

        orderTimeDate: {
            type: Sequelize.DATE,
            allowNull: false
        },

        orderTimeDate: {
            type: Sequelize.DATE,
            allowNull: false
        },

        statusOrder: {
            type: Sequelize.ENUM('READY', 'WAITED', 'CANCELED', 'PAID'),
            allowNull: false
        },

        description: {
            type: Sequelize.STRING
        }
      })
      Order.associate = function (models) {
        Order.belongsTo(models.Car, {
         through: 'CarOrder',
         foreignKey: 'idCar'
        })

        Order.belongsTo(models.User, {
         through: 'CarUser',
         foreignKey: 'idUser'
        })

        Order.belongsTo(models.InsuranceType, {
         through: 'OrderInsurance',
         foreignKey: 'idInsurance'
        })

        Order.belongsTo(models.RegionSize, {
         through: 'OrderRegionSize',
         foreignKey: 'idRegionSize'
        })

        Order.belongsTo(models.RegionName, {
         through: 'OrderRegionName',
         foreignKey: 'idRegionName'
        })
      };

    return Order;

}
