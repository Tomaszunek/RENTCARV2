module.exports = function(sequelize, Sequelize) {

    var CarPriceCategory = sequelize.define('CarPriceCategory', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        priceCategoryName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        pricePerDay: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
      })
      CarPriceCategory.associate = function (models) {
        CarPriceCategory.hasOne(models.Car, {
         through: 'CarPriceCategory',
         foreignKey: 'idPriceCategory'
        })
      };

    return CarPriceCategory;

}
