const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        cav_id: { type: DataTypes.BIGINT, allowNull: true },
        product_id: { type: DataTypes.INTEGER, allowNull: true },
        created_on: { type: DataTypes.DATE, allowNull: true },
        created_by: { type: DataTypes.INTEGER, allowNull: true },
        last_modified_on: { type: DataTypes.DATE, allowNull: true },
        last_modified_by: { type: DataTypes.INTEGER, allowNull: true }
    };

    const options = {
    };

    return sequelize.define('qa_data_product', attributes, options);
}