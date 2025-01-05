'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [
      {
        name: 'Apple MacBook Pro 17"',
        description: 'Silver, Laptop',
        price: 2999,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Microsoft Surface Pro',
        description: 'White, Laptop PC',
        price: 1999,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Magic Mouse 2',
        description: 'Black, Accessories',
        price: 99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dell XPS 15',
        description: 'Silver, Laptop',
        price: 2399,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Logitech MX Master 3',
        description: 'Graphite, Accessories',
        price: 119,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'HP Spectre x360',
        description: 'Black, Convertible Laptop',
        price: 1599,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Asus ROG Zephyrus G14',
        description: 'White, Gaming Laptop',
        price: 1499,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Apple AirPods Pro',
        description: 'White, Accessories',
        price: 249,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Samsung Galaxy Book Pro',
        description: 'Mystic Blue, Laptop',
        price: 1299,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Razer Blade 15',
        description: 'Black, Gaming Laptop',
        price: 2599,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {});
  },
};


