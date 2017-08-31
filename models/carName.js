module.exports = function(sequelize, Sequelize) {

    var CarName = sequelize.define('CarName', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        carName: {
            type: Sequelize.STRING,
            allowNull: false
        }
      })
      CarName.associate = function (models) {
        CarName.hasOne(models.Car, {
         through: 'CarName',
         foreignKey: 'idName'
        })
      };

    return CarName;

}
