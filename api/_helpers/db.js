const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.livedatabase;
    const connection = await mysql.createConnection({ host, port, user, password });
    // const connection = await mysql.createConnection({host: host, user: user, database: database});
    

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { host : host, dialect: 'mysql' , pool: {
        max: 20,
        min: 0,
        acquire: 60000000,
        idle: 100000000
      }});

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    // db.Artical = require('../artical/artical.model')(sequelize);
    db.QaData = require('../artical/qa_data.model')(sequelize);
    db.QaDataProduct = require('../artical/qa_data_product.model')(sequelize);
    db.QaClientProduct = require('../artical/qa_client_product.model')(sequelize);
    db.QaDataSpokesPerson = require('../artical/qa_data_spokesperson')(sequelize);
    db.QaSpokesPerson = require('../artical/qa_spokesperson.model')(sequelize);

    db.QaUploadDetail = require('../artical/qa_upload_details.model')(sequelize);
    db.Edition = require('../artical/edition.model')(sequelize);
    db.QaSetting = require('../artical/qa_setting.model')(sequelize);
    db.QaVerticalSetting = require('../artical/qa_vertical_setting.model')(sequelize);

    
    // sync all models with database
    await sequelize.sync();
    
}