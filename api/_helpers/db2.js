const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db2 = {};

initialize();

async function initialize() {
    // create db2 if it doesn't already exist
    const { host, port, user, password, database } = config.livedatabase2;
    const connection = await mysql.createConnection({ host, port, user, password });
    // const connection = await mysql.createConnection({host: host, user: user, database: database});
    

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db2
    const sequelize = new Sequelize(database, user, password, { host : host, dialect: 'mysql' , pool: {
        max: 20,
        min: 0,
        acquire: 60000000,
        idle: 1000000000
      }});

    // // init models and add them to the exported db2 object
    db2.OnlineData = require('../artical/online.model')(sequelize);
    db2.PrintData = require('../artical/print.model')(sequelize);
    // // db2.Artical = require('../artical/artical.model')(sequelize);
    // db2.QaData = require('../artical/qa_data.model')(sequelize);
    // db2.QaDataProduct = require('../artical/qa_data_product.model')(sequelize);
    // db2.QaClientProduct = require('../artical/qa_client_product.model')(sequelize);
    // db2.QaDataSpokesPerson = require('../artical/qa_data_spokesperson')(sequelize);
    // db2.QaSpokesPerson = require('../artical/qa_spokesperson.model')(sequelize);

    
    // sync all models with database
    await sequelize.sync();
    
}