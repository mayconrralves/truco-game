'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Games-Users', {
            // id: {
            //   allowNull: false,
            //   autoIncrement: true,
            //   primaryKey: true,
            //   type: Sequelize.INTEGER
            // },
            // fk_user_id: {
            //   type: Sequelize.INTEGER,
            //   references: { model: 'Users', key: 'id'},
            //   onUpdate: 'CASCADE',
            //   onDelete: 'CASCADE',
            //   allowNull: false,
            // },
            // fk_game_id: {
            //   type: Sequelize.INTEGER,
            //   allowNull: false,
            //   references: {model: 'Games', key: 'id'},
            //   onUpdate: 'CASCADE',
            //   onDelete: 'CASCADE',
            //   allowNull: false,
            // },
            // createdAt: {
            //   allowNull: false,
            //   type: Sequelize.DATE
            // },
            // updatedAt: {
            //   allowNull: false,
            //   type: Sequelize.DATE
            // }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Games-Users');
    },
};
