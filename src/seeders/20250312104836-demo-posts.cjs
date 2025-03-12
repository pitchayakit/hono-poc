'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Count existing posts
    const postCount = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM posts',
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    // Only add posts if none exist
    if (postCount[0].count === '0') {
      // Add initial demo posts
      console.log('Adding initial demo posts...');
      return queryInterface.bulkInsert('posts', [
        { 
          title: 'First Post', 
          content: 'This is the content of the first post.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          title: 'Second Post', 
          content: 'This is the content of the second post.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          title: 'Third Post', 
          content: 'This is the content of the third post.',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    } else {
      console.log('Posts already exist, skipping seed...');
      return Promise.resolve();
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove all demo posts
    console.log('Removing demo posts...');
    return queryInterface.bulkDelete('posts', null, {});
  }
}; 