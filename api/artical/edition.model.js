const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        edition_name: { type: DataTypes.STRING, allowNull: true },
    };

    const options = {
    };

    return sequelize.define('editions', attributes, options);
}