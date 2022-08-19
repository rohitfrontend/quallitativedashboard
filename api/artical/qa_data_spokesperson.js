const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        cav_id: { type: DataTypes.INTEGER, allowNull: true },
        spokesperson_id: { type: DataTypes.INTEGER, allowNull: true },
        spokesperson_profiling: { type: DataTypes.STRING, allowNull: true },
        created_on: { type: DataTypes.DATE, allowNull: true },
        created_by: { type: DataTypes.INTEGER, allowNull: true },
        last_modified_on: { type: DataTypes.DATE, allowNull: true },
        last_modified_by: { type: DataTypes.INTEGER, allowNull: true }
    };

    const options = {
    };

    return sequelize.define('qa_data_spokesperson', attributes, options);
}