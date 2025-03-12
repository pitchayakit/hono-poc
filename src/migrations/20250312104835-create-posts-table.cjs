'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Wrap in transaction for atomicity
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Create posts table
      console.log('Creating posts table...');
      await queryInterface.createTable('posts', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { transaction });
      
      // Commit the transaction
      await transaction.commit();
      console.log('Migration completed successfully');
    } catch (error) {
      // Rollback the transaction on error
      await transaction.rollback();
      console.error('Migration failed:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    console.log('Rolling back posts table...');
    return queryInterface.dropTable('posts');
  }
}; 