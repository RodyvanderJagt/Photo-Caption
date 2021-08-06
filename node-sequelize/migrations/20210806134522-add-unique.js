'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Users', {
        fields: ['name'],
        type: 'unique',
        name: 'constraint_users_unique_name'
      })
    
    await queryInterface.addConstraint('Captions', {
      fields: ['caption'],
      type: 'unique',
      name: 'constraint_captions_unique_caption'
    })
    
    await queryInterface.addConstraint('Images', {
      fields: ['filepath'],
      type: 'unique',
      name: 'constraint_images_unique_filepath'
    })

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
        
     await queryInterface.removeConstraint('Users', 'constraint_users_unique_name');

     await queryInterface.removeConstraint('Captions', 'constraint_captions_unique_caption');

     await queryInterface.removeConstraint('Images', 'constraint_images_unique_filepath');
  }
};
