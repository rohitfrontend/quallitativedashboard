
const db = require('_helpers/db');

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



async function getAll() {
    return await db.Artical.findAll();
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
   
    await db.QaData.create(params);
}

async function createQaSpokesPerson(params) {
   
   return await db.QaSpokesPerson.create(params);
}

async function createQaDataSpokesPerson(params) {
   
     await db.QaDataSpokesPerson.create(params);
 }

 async function createQaClientProduct(params) {
   
    return await db.QaClientProduct.create(params);
 }
 
 async function createQaDataProduct(params) {
    
      await db.QaDataProduct.create(params);
  }