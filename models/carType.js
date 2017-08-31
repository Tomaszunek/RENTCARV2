module.exports = function(sequelize, Sequelize) {

    var CarType = sequelize.define('CarType', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        typeName: {
            type: Sequelize.STRING,
            allowNull: false
        }
      })
      CarType.associate = function (models) {
        CarType.hasOne(models.Car, {
         through: 'CarType',
         foreignKey: 'idType'
        })
      };  

  return CarType;

}
