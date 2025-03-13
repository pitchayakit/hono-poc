'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Count existing posts to avoid adding duplicates if this is run multiple times
      const results = await queryInterface.sequelize.query(
        'SELECT COUNT(*) as count FROM posts',
        { type: Sequelize.QueryTypes.SELECT }
      );
      
      const postCount = parseInt(results[0].count, 10);
      
      // Only add posts if less than 100 exist
      if (postCount < 100) {
        console.log(`Adding ${100 - postCount} mock posts...`);
        
        // Generate mock posts data
        const mockPosts = [];
        const numToAdd = 100 - postCount;
        
        // Generate random user IDs between 1 and 10
        const userIds = Array.from({ length: 10 }, (_, i) => i + 1);
        
        for (let i = 0; i < numToAdd; i++) {
          const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
          const createdDate = faker.date.past({ years: 2 });
          const updatedDate = faker.date.between({ from: createdDate, to: new Date() });
          
          mockPosts.push({
            title: faker.lorem.sentence({ min: 3, max: 8 }).slice(0, 254), // Ensure it fits in VARCHAR(255)
            content: faker.lorem.paragraphs({ min: 1, max: 5 }),
            userId: randomUserId,
            createdAt: createdDate,
            updatedAt: updatedDate
          });
        }
        
        // Insert the mock posts
        return queryInterface.bulkInsert('posts', mockPosts);
      } else {
        console.log('At least 100 posts already exist, skipping seed...');
        return Promise.resolve();
      }
    } catch (error) {
      console.error('Error seeding mock posts:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove the mock posts
    // Note: This will remove ALL posts, use with caution
    console.log('Removing mock posts...');
    return queryInterface.bulkDelete('posts', null, {});
  }
};
