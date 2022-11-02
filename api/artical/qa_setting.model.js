const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        client_id: { type: DataTypes.INTEGER, allowNull: false },
        graph_type:{ type: DataTypes.STRING, allowNull: false },
        graph_id:{ type: DataTypes.INTEGER, allowNull: false },
        client_name:{ type: DataTypes.STRING, allowNull: false },
        entity_level: { type: DataTypes.BOOLEAN, allowNull: false },
        publication_level: { type: DataTypes.BOOLEAN, allowNull: false },
        journalist_level: { type: DataTypes.BOOLEAN, allowNull: false },
        city_level: { type: DataTypes.BOOLEAN, allowNull: false },
        keyword_level: { type: DataTypes.BOOLEAN, allowNull: false },
        spokesperson_level:{ type: DataTypes.BOOLEAN, allowNull: false },
        profiling_level: { type: DataTypes.BOOLEAN, allowNull: false },
        visibility_level:{ type: DataTypes.BOOLEAN, allowNull: false },
        topic_level: { type: DataTypes.BOOLEAN, allowNull: false },
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

    return sequelize.define('qa_settings', attributes, options);
}