const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        username: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        client_id: { type: DataTypes.STRING, allowNull: true },
        client_name: { type: DataTypes.STRING, allowNull: true },
        ip_address: { type: DataTypes.STRING, allowNull: true },
        file: { type: DataTypes.STRING, allowNull: true },
        originalname: { type: DataTypes.STRING, allowNull: true },
        filename: { type: DataTypes.STRING, allowNull: true },
        month: { type: DataTypes.INTEGER, allowNull: true },
        year: { type: DataTypes.INTEGER, allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: true},
        updated_at: { type: DataTypes.DATE, allowNull: true},
        createdAt: { type: DataTypes.DATE, allowNull: true},
        updatedAt: { type: DataTypes.DATE, allowNull: true}
    };

    const options = {
    };

    return sequelize.define('qa_upload_detail', attributes, options);
}