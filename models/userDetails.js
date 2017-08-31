module.exports = function(sequelize, Sequelize) {

    var UserDetails = sequelize.define('UserDetails', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        idUser: {
            forgeinKey: true,
            type: Sequelize.INTEGER
        },

        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        gender: {
            type: Sequelize.ENUM('MEN', 'WOMEN'),
            allowNull: true
        },

        cityLive: {
            type: Sequelize.STRING,
            allowNull: false
        },

        address: {
            type: Sequelize.STRING,
            allowNull: false
        },

        birthDay: {
            type: Sequelize.DATE,
            allowNull: false
        }
      })
      UserDetails.associate = function (models) {
        UserDetails.belongsTo(models.User, {
         through: 'CarUser',
         foreignKey: 'idUser'
        })

      };

    return UserDetails;

}
