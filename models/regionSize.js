module.exports = function(sequelize, Sequelize) {

    var RegionSize = sequelize.define('RegionSize', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        regionSizeName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        regionPrice: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
      })
      RegionSize.associate = function (models) {
        RegionSize.hasOne(models.Car, {
         through: 'RegionSize',
         foreignKey: 'idRegionSize'
        })

        RegionSize.hasOne(models.Order, {
         through: 'RegionSize',
         foreignKey: 'idRegionSize'
        })
      };

  return RegionSize;

}
