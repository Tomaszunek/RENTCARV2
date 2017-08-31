module.exports = function(sequelize, Sequelize) {

    var User = sequelize.define('User', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        username: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        phone: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        last_login: {
            type: Sequelize.DATE,
        },

        onlineNow: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },

        activeAcc: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },

        passwdReset: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      })
      User.associate = function (models) {
        User.hasOne(models.Order, {
         through: 'CarUser',
         foreignKey: 'idUser'
        })

        User.hasOne(models.UserDetails, {
         through: 'CarUser',
         foreignKey: 'idUser'
        })

      };

    return User;

}
