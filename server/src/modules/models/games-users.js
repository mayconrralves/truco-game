'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GamesUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'fk_user_id', as: 'fk_user'});
      this.belongsTo(models.Games, {foreignKey: 'fk_game_id',as:'fk_game'});
    }
  }

  GamesUsers.init({
    
  }, {
    sequelize,
    modelName: 'GamesUsers',
  });
  return GamesUsers;
};