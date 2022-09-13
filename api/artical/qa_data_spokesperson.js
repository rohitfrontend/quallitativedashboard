const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        q_article_id: { type: DataTypes.BIGINT, allowNull: false},
        spokesperson_id: { type: DataTypes.INTEGER, allowNull: true },
        spokesperson_profiling: { type: DataTypes.STRING, allowNull: true },
        created_by: { type: DataTypes.INTEGER, allowNull: true },
        last_modified_by: { type: DataTypes.INTEGER, allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: true},
        updated_at: { type: DataTypes.DATE, allowNull: true},
        createdAt: { type: DataTypes.DATE, allowNull: true},
        updatedAt: { type: DataTypes.DATE, allowNull: true}
    };

    const options = {
    };

    return sequelize.define('q_spokepeople', attributes, options);
}