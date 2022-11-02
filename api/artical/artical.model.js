const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        article_id: { type: DataTypes.INTEGER, allowNull: false },
        media_type: { type: DataTypes.STRING, allowNull: false },
        agency: { type: DataTypes.STRING, allowNull: false },
        total_CCMs: { type: DataTypes.DECIMAL, allowNull: false },
        photo: { type: DataTypes.STRING, allowNull: false },
        headline: { type: DataTypes.STRING, allowNull: false },
        prominence: { type: DataTypes.STRING, allowNull: false },
        tonality: { type: DataTypes.STRING, allowNull: false },
        vertical: { type: DataTypes.STRING, allowNull: false },
        ev: { type: DataTypes.STRING, allowNull: false },
        theme: { type: DataTypes.STRING, allowNull: false },
        keyword_level_1: { type: DataTypes.STRING, allowNull: false },
        topic: { type: DataTypes.TEXT, allowNull: false },
        p1: { type: DataTypes.STRING, allowNull: false },
        p2: { type: DataTypes.STRING, allowNull: false },
        p3: { type: DataTypes.STRING, allowNull: false },
        p4: { type: DataTypes.STRING, allowNull: false },
        p5: { type: DataTypes.STRING, allowNull: false },
        p6: { type: DataTypes.STRING, allowNull: false },
        p7: { type: DataTypes.STRING, allowNull: false },
        p8: { type: DataTypes.STRING, allowNull: false },
        p9: { type: DataTypes.STRING, allowNull: false },
        p10: { type: DataTypes.STRING, allowNull: false },
        article_type: { type: DataTypes.STRING, allowNull: false },
        spokesperson1: { type: DataTypes.STRING, allowNull: false },
        spokesperson_profiling1: { type: DataTypes.STRING, allowNull: false },
        spokesperson2: { type: DataTypes.INTEGER, allowNull: false },
        spokesperson_profiling2: { type: DataTypes.STRING, allowNull: false },
        spokesperson3: { type: DataTypes.INTEGER, allowNull: false },
        spokesperson_profiling3: { type: DataTypes.STRING, allowNull: false },
        photo_weightage: { type: DataTypes.INTEGER, allowNull: false },
        headline_weightage: { type: DataTypes.STRING, allowNull: false },
        prominence_weightage: { type: DataTypes.STRING, allowNull: false },
        product: { type: DataTypes.INTEGER, allowNull: false },
        spokesperson: { type: DataTypes.INTEGER, allowNull: false },
        word_count_weightage: { type: DataTypes.STRING, allowNull: false },
        front_page: { type: DataTypes.STRING, allowNull: false },
        visibility_score: { type: DataTypes.STRING, allowNull: false },
        co_score: { type: DataTypes.INTEGER, allowNull: false },
        circulation_web_weightage: { type: DataTypes.STRING, allowNull: false },
        index: { type: DataTypes.INTEGER, allowNull: false },
    };

    const options = {};

    return sequelize.define('articals', attributes, options);
}