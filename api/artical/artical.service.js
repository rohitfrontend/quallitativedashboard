
const db = require('_helpers/db');
const db2 = require('_helpers/db2');

module.exports = {
    getAll,
    getById,
    create,
    delete: _delete,
    createQaData,
    createQaSpokesPerson,
    createQaDataSpokesPerson,
    createQaClientProduct,
    createQaDataProduct

};



async function getAll(client_id, article_id, entity_name, media_type) {

// await db.query("SELECT * FROM print_data where article_id='221482940' AND entity_name='Ashok Leyland' AND client_id='8'", { type: QueryTypes.SELECT });
let result;
    if(media_type === 'Print'){
        result = await db2.PrintData.findAll({ where: { client_id: client_id, article_id: article_id, entity_name: entity_name }, attributes: [
            'id', 'client_id', 'entity_id', 'entity_name', 'entity_group_id', 'entity_group', 'article_id', 'article_type_id', 'article_type', 'publish_date', 'publish_datetime', 'article_created_on_datetime', 'article_created_on', 'publication_id', 'edition_id', 'zone_id', 'publication_type_id', 'language_id', 'suppliment_id', 'source', 'source_id', 'reportor', 'mav', 'ccm', 'section_id', 'is_front_page', 'is_photo', 'cav_id', 'tonality_id', 'direct_news_id', 'hit_n_miss_id', 'product_services', 'headline_mention', 'spokesperson_id', 'photo_mention_id', 'prominent_id', 'category_id', 'created_on', 'created_by', 'last_modified_on', 'last_modified_by', 'priority_id', 'entity_article_id', 'press_release_id', 'month', 'is_client_favourite' // We had to list all attributes...
          ]});
    }
    if(media_type === 'Online'){
        result = await db2.OnlineData.findAll({ where: { client_id: client_id, article_id: article_id, entity_name: entity_name }, attributes: [
            'id', 'client_id', 'entity_id', 'entity_name', 'entity_group_id', 'entity_group', 'article_id', 'article_type_id', 'article_type', 'publish_date', 'publish_datetime', 'article_created_on_datetime', 'article_created_on', 'publication_id', 'edition_id', 'zone_id', 'publication_type_id', 'language_id', 'suppliment_id', 'source', 'source_id', 'reportor', 'mav', 'ccm', 'section_id', 'is_front_page', 'is_photo', 'cav_id', 'tonality_id', 'direct_news_id', 'hit_n_miss_id', 'product_services', 'headline_mention', 'spokesperson_id', 'photo_mention_id', 'prominent_id', 'category_id', 'created_on', 'created_by', 'last_modified_on', 'last_modified_by', 'priority_id', 'entity_article_id', 'press_release_id', 'month', 'is_client_favourite' // We had to list all attributes...
          ]});
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

async function createQaData(params) {
    return await db.QaData.findOrCreate({ where: { article_id: params.article_id }, defaults:  params });
}

async function createQaSpokesPerson(params) {
   
   return await db.QaSpokesPerson.findOrCreate({ where: { spokesperson_name: params.spokesperson_name }, defaults:  params });
}

async function createQaDataSpokesPerson(params) {
   
     await db.QaDataSpokesPerson.create(params);
 }

 async function createQaClientProduct(params) {
   
    return await db.QaClientProduct.findOrCreate({ where: { product_name: params.product_name }, defaults:  params });
 }
 
 async function createQaDataProduct(params) {
    
      await db.QaDataProduct.create(params);
  }