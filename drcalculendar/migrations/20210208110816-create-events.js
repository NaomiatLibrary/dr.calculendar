'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventid: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      firstdate: {
        type: Sequelize.DATEONLY
      },
      lastdate: {
        type: Sequelize.DATEONLY
      },
      duration: {
        type: Sequelize.INTEGER
      },
      firsttime: {
        type: Sequelize.INTEGER
      },
      lasttime: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('events');
  }
};