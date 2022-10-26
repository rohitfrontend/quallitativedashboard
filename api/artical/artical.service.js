
const db = require('_helpers/db');
const db2 = require('_helpers/db2');
const { Op } = require("sequelize");
const { func } = require('joi');

module.exports = {
    getAll,
    getById,
    create,
    delete: _delete,
    createQaData,
    createQaSpokesPerson,
    createQaDataSpokesPerson,
    createQaClientProduct,
    createQaDataProduct,
    addUploadDetails,
    getAllListUpload,
    getEdition,
    updateQaData,
    addQaData,
    getSetting,
    addSetting,
    getQualitativeCheck,
    getSettingAll,
    deleteSetting,
    updateSetting,
    addVerticalSetting,
    getVerticalSetting
};



async function getAllListUpload() {
    const result = await db.QaUploadDetail.findAll();
    return result;
}
async function getAll(client_id, article_id, entity_name, media_type) {

    // await db.query("SELECT * FROM print_data where article_id='221482940' AND entity_name='Ashok Leyland' AND client_id='8'", { type: QueryTypes.SELECT });
    let result;
    if (media_type === 'Print') {
        result = await db2.PrintData.findAll({
            where: { [Op.or]: [{ client_id: client_id, article_id: article_id, entity_name: entity_name }, {  article_id: article_id, entity_name: entity_name }] }, attributes: [
                'id', 'client_id', 'entity_id', 'entity_name', 'entity_group_id', 'entity_group', 'article_id', 'article_type_id', 'article_type', 'publish_date', 'publish_datetime', 'article_created_on_datetime', 'article_created_on', 'publication_id', 'edition_id', 'zone_id', 'publication_type_id', 'language_id', 'suppliment_id', 'source', 'source_id', 'reportor', 'mav', 'ccm', 'section_id', 'is_front_page', 'is_photo', 'cav_id', 'tonality_id', 'direct_news_id', 'hit_n_miss_id', 'product_services', 'headline_mention', 'spokesperson_id', 'photo_mention_id', 'prominent_id', 'category_id', 'created_on', 'created_by', 'last_modified_on', 'last_modified_by', 'priority_id', 'entity_article_id', 'press_release_id', 'month', 'is_client_favourite' // We had to list all attributes...
            ]
        });
    }
    if (media_type === 'Online') {
        result = await db2.OnlineData.findAll({
            where: {
                [Op.or]: [{ client_id: client_id, article_id: article_id, entity_name: entity_name }, {  article_id: article_id, entity_name: entity_name }] }, attributes: [
                'id', 'client_id', 'entity_id', 'entity_name', 'entity_group_id', 'entity_group', 'article_id', 'article_type_id', 'article_type', 'publish_date', 'publish_datetime', 'article_created_on_datetime', 'article_created_on', 'publication_id', 'edition_id', 'zone_id', 'publication_type_id', 'language_id', 'suppliment_id', 'source', 'source_id', 'reportor', 'mav', 'ccm', 'section_id', 'is_front_page', 'is_photo', 'cav_id', 'tonality_id', 'direct_news_id', 'hit_n_miss_id', 'product_services', 'headline_mention', 'spokesperson_id', 'photo_mention_id', 'prominent_id', 'category_id', 'created_on', 'created_by', 'last_modified_on', 'last_modified_by', 'priority_id', 'entity_article_id', 'press_release_id', 'month', 'is_client_favourite' // We had to list all attributes...
            ]
        });
    }
    return result;

}

async function getById(id) {
    return await getArtical(id);
}

async function create(params) {

    await db.Artical.create(params);
}


async function _delete(id) {
    const artical = await getArtical(id);
    await artical.destroy();
}

// helper functions



async function getArtical(id) {
    const artical = await db.Artical.findByPk(id);
    if (!artical) throw 'Artical not found';
    return artical;
}

async function getEdition(name) {
    const edition = await db.Edition.findOne({ where: { edition_name: name }, attributes: [`id`, `edition_name`] });;
    return edition;
}
async function addQaData(params) {
    return await db.QaData.create(params);
}   

async function createQaData(params) {
    //check article id and cav id if there cavid
    if(params?.cav_id){
        const { count, rows } = await db.QaData.findAndCountAll({ where: {  article_id: params.article_id, cav_id: params?.cav_id }})
        if(count === 0){
            return addQaData(params);
        }
        if(count === 1){
            return updateQaData(params, rows[0])
        }
    }else{
        if(params?.media_type === 'Print'){
            const { count, rows } = await db.QaData.findAndCountAll({ where: {  article_id: params.article_id, edition_id: params?.edition_id }})
            if(count === 0){
                return addQaData(params);
            }
            if(count === 1){
                return updateQaData(params, rows[0])
            }
        }
        else{
            return addQaData(params);
        }
    }
    
}

async function updateQaData(params, article) {
    await db.QaData.update(params, { where: { id: article.id } });
    return db.QaData.findOne({ where: { id: article.id } });
}

async function createQaSpokesPerson(params) {

    return await db.QaSpokesPerson.findOrCreate({ where: { spokesperson_name: params.spokesperson_name }, defaults: params });
}

async function createQaDataSpokesPerson(params) {

    await db.QaDataSpokesPerson.findOrCreate({ where: { spokesperson_id: params.spokesperson_id, q_article_id : params.q_article_id }, defaults: params });
}

async function createQaClientProduct(params) {

    return await db.QaClientProduct.findOrCreate({ where: { product_name: params.product_name }, defaults: params });
}

async function createQaDataProduct(params) {

    await db.QaDataProduct.findOrCreate({ where: { product_id: params.product_id, q_article_id : params.q_article_id }, defaults: params });
}

async function addUploadDetails(params) {

    await db.QaUploadDetail.create(params);
}



async function addSetting(params) {
    const [row, created] = await db.QaSetting.findOrCreate({ where: { client_id: params.client_id, graph_type: params.graph_type  }, defaults: params });
    if(created === true){
        await db.QaSetting.update(params, { where: { id: row.id } });
    }
    return created;
}

async function addVerticalSetting(params) {
    const [row, created] = await db.QaVerticalSetting.findOrCreate({ where: { client_id: params.client_id  }, defaults: params });
    if(created === true){
        await db.QaVerticalSetting.update(params, { where: { id: row.id } });
    }
    return created;
}

async function getVerticalSetting(client_id) {
    const result = await db.QaVerticalSetting.findOne({
        where: { client_id: client_id },
        attributes: ["id",
         "verticals", "isVertical" ]
      });
    return result;
}
async function getSetting(client_id) {
    const result = await db.QaSetting.findAll({
        where: { client_id: client_id },
        attributes: ["id",
        "client_id",
        "graph_type",
        "entity_level",
        "publication_level",
        "journalist_level",
        "city_level",
        "keyword_level",
        "spokesperson_level",
        "profiling_level",
        "visibility_level", "topic_level", "client_name", "graph_id"]
      });
    return result;
}
async function getQualitativeCheck(client_id) {
    const { count, rows }  = await db.QaData.findAndCountAll({
        where: { client_id: client_id }
      });
    return count;
}

async function getSettingAll(client_id) {
    const result = await db.QaSetting.findAll({
        attributes: ["id",
        "client_id",
        "graph_type",
        "entity_level",
        "publication_level",
        "journalist_level",
        "city_level",
        "keyword_level",
        "spokesperson_level",
        "profiling_level",
        "visibility_level", "topic_level" , "client_name", "graph_id"]
      });
    return result;
}

async function updateSetting(id, data) {
    await db.QaSetting.update(data, { where: { id: id } });
}
async function deleteSetting(id) {
    await db.QaSetting.destroy({ where: { id: id } });
}