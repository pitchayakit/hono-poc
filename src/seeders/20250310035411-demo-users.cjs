'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Count existing users
    const userCount = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM users',
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    // Only add users if none exist
    if (userCount[0].count === '0') {
      // Add initial demo users
      console.log('Adding initial demo users...');
      return queryInterface.bulkInsert('users', [
        { 
          name: 'John Doe', 
          email: 'john@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          name: 'Jane Smith', 
          email: 'jane@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          name: 'Bob Johnson', 
          email: 'bob@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    } else {
      console.log('Users already exist, skipping seed...');
      return Promise.resolve();
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove all demo users
    console.log('Removing demo users...');
    return queryInterface.bulkDelete('users', null, {});
  }
};
