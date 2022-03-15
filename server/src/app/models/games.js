'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {foreignKey: 'user_id', as: 'creatorId'});
      this.belongsTo(models.Users, {foreignKey: 'user_id', as: 'winnerId'});
      this.belongsToMany(models.Games, {through: 'GamesUsers', foreignKey: 'fk_user_id', as: 'fkUser'});
    }
  }
  Games.init({
    id_winner: DataTypes.INTEGER,
    id_creator: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Games',
  });
  return Games;
};