const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        client_id: { type: DataTypes.INTEGER, allowNull: false },
        client_name:{ type: DataTypes.STRING, allowNull: false },
        isVertical: { type: DataTypes.BOOLEAN, allowNull: false },
        verticals: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        created_by: { type: DataTypes.INTEGER, allowNull: true },
        last_modified_by: { type: DataTypes.INTEGER, allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: true},
        updated_at: { type: DataTypes.DATE, allowNull: true},
        deleted_at: { type: DataTypes.DATE, allowNull: true},
        createdAt: { type: DataTypes.DATE, allowNull: true},
        updatedAt: { type: DataTypes.DATE, allowNull: true}
    };

    const options = {
    };

    return sequelize.define('qa_vertical_setting', attributes, options);
}