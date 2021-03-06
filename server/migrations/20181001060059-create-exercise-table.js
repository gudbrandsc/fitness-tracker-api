'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
     queryInterface.createTable('Exercise_Tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Weight: {
		allowNull: false,
        type: Sequelize.INTEGER
      },
	  NoOfSets: {
		allowNull: false,
        type: Sequelize.INTEGER
      },
	  NoOfSets: {
		allowNull: false,
        type: Sequelize.INTEGER
      },
      NoOfReps: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
	  createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
	  WorkoutId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Workout_tables',
          key: 'id',
          as: 'WorkoutId',
        },
      },
	  UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User_Details',
          key: 'id',
          as: 'Userid',
        },
      },
    }),
  
     down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Exercise_Tables'),

};