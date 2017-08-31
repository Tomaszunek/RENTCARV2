module.exports = function(sequelize, Sequelize) {

    var RegionName = sequelize.define('RegionName', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        regionName: {
            type: Sequelize.STRING,
            allowNull: false
        }
      })
      RegionName.associate = function (models) {
        RegionName.hasOne(models.Car, {
         through: 'RegionName',
         foreignKey: 'idRegionName'
        })

        RegionName.hasOne(models.Order, {
         through: 'RegionName',
         foreignKey: 'idRegionName'
        })
      };


  return RegionName;

}
