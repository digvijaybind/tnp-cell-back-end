const Sequelize=require('sequelize');

module.exports = new Sequelize('t_pcell', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  
    pool: {
       max: 100,
       min: 0,
      idle: 10000
    },

  });

