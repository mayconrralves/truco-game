'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Users, { through: 'GamesUsers', foreignKey: 'fk_game_id', as: 'fkGame'});
    }
    checkPassword(password){
      return bcrypt.compare(password, this.password_hash)
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.addHook('beforeCreate',async (user)=>{
    if(user.password){
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  });

  return Users;
};