const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        product_name: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.STRING, allowNull: true },
        company_id: { type: DataTypes.INTEGER, allowNull: true },
        is_active: { type: DataTypes.TINYINT, allowNull: true },
        created_on: { type: DataTypes.DATE, allowNull: true },
        created_by: { type: DataTypes.INTEGER, allowNull: true },
        last_modified_on: { type: DataTypes.DATE, allowNull: true },
        last_modified_by: { type: DataTypes.INTEGER, allowNull: true }
    };

    const options = {
    };

    return sequelize.define('qa_client_product', attributes, options);
}