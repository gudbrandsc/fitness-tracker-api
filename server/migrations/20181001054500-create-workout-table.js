'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
     queryInterface.createTable('Workout_table', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      WorkoutName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
	  CategoryId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Workout_Categories',
          key: 'id',
          as: 'CategoryId',
        },
      },
    }),
   down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Workout_table'),

};