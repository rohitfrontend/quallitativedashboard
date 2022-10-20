const express = require('express');
const reader = require('xlsx')
const articalService = require('./artical.service');
const moment = require('moment');

const multer = require('multer')
const XLSXWriteStream = require('xlsx-write-stream');
const storageCustom = require('./customStorageEngine')

var XLSX = require('xlsx');
const states = [
    { id:0, city: "National", state: "National"},
    { id:99, city: "Online Web", state:"Online Web"},
    { id: 28, city: "Ludhiana", state: "Punjab" },
    { id: 6, city: "Chandigarh", state: "Punjab" },
    { id: 10, city: "New Delhi", state: "New Delhi" },
    { id: 29, city: "Jaipur", state: "Rajasthan" },
    { id: 33, city: "Lucknow", state: "Uttar Pradesh" },
    { id: 5, city: "Patna", state: "Bihar" },
    { id: 4, city: "Guwahati", state: "Assam" },
    { id: 26, city: "Bhubaneswar", state: "Odisha" },
    { id: 7, city: "Raipur", state: "Chhattisgarh" },
    { id: 20, city: "Indore", state: "Madhya Pradesh" },
    { id: 12, city: "Ahmedabad", state: "Gujarat" },
    { id: 21, city: "Pune", state: "Maharashtra" },
    { id: 21, city: "Aurangabad", state: "Maharashtra" },
    { id: 2, city: "Vijayawada", state: "Andhra Pradesh" },
    { id: 17, city: "Bangalore", state: "Karnataka" },
    { id: 18, city: "Kochi", state: "Kerala" },
    { id: 20, city: "Bhopal", state: "Madhya Pradesh" },
    { id: 31, city: "Chennai", state: "Tamil Nadu" },
    { id: 36, city: "Hyderabad", state: "Telangana" },
    { id: 16, city: "Jamshedpur", state: "Jharkhand" },
    { id: 35, city: "Kolkata", state: "West Bengal" },
    { id: 21, city: "Mumbai", state: "Maharashtra" },
    { id: 16, city: "Ranchi", state: "Jharkhand" },
    { id: 12, city: "Vadodara", state: "Gujarat"},
    { id: 12, city: "Rajkot", state: "Gujarat"},
    { id: 17, city:"Mangalore", state: "Karnataka"},
    { id:12, city:"Surat", state: "Gujarat"},
    { id: 21, city: "Nagpur", state: "Maharashtra" },
    { id: 100, city: "Goa", state: "Goa"},
    { id: 33, city: "Greater Noida", state: "Uttar Pradesh" },
    { id: 33, city: "Noida", state: "Uttar Pradesh" },
]

exports.getArtical = async function (req, res, next) {
    let edition = await articalService.getEdition('Online Web');
    res.json({ edition: edition, message: 'Edition successful' })
}   
exports.getList = async function (req, res, next) {
    articalService.getAllListUpload().then((data) => {
        res.json({ data: data, message: 'Artical successful' })
    })
}


exports.saveArtical = async function (req, res, next) {
    console.log('files', req.body)
    var f = req.body.upload; // <input type="file" id="upload" name="upload">
    var workbook = XLSX.readFile(f.path, { 'type': 'base64', cellDates: true, raw: true });
    var data = [];
    // var sheetHeader;
    // var sheet_name_list1 = workbook.SheetNames;
    // let sheet_name_list = [];
    // sheet_name_list.push(sheet_name_list1[0]);
    // sheet_name_list.forEach(function (y) {
    //     var worksheet = workbook.Sheets[y];
    //     var a = {};
    //     var headers = {};
    //     // var data = [];
    //     var result = [];
    //     for (z in worksheet) {
    //         if (z[0] === '!') continue;
    //         //parse out the column, row, and value
    //         var tt = 0;
    //         for (var i = 0; i < z.length; i++) {
    //             if (!isNaN(z[i])) {
    //                 tt = i;
    //                 break;
    //             }
    //         };
    //         var col = z.substring(0, tt);
    //         var row = parseInt(z.substring(tt));
    //         var value = worksheet[z].v === 'Link' ? worksheet[z].l?.Target : worksheet[z].v;
    //         //store header names
    //         if (row == 1 && value) {
    //             headers[col] = value.toLowerCase();
    //             sheetHeader = headers;
    //             continue;
    //         }

    //         if (!data[row]) data[row] = {};
    //         data[row][headers[col]] = value;
    //     }
    //     data.shift();
    //     data.shift();
    // });

    const addUploadDetails = new Promise((resolve, reject) => {
        articalService.addUploadDetails({
            username: req.body.username,
            email: req.body.email,
            client_id: req.body.client_id,
            client_name: req.body.client_name,
            month: req.body.month,
            year: req.body.year,
            ip_address: req.body.ip_address,
            file: f.url,
            filename: f.filename,
            originalname: f.originalname
        })
    });

    const addSetting = new Promise((resolve, reject) => {
        JSON.parse(req.body.setting).map(async (e, index) => {
            articalService.addSetting({
                client_id: req.body.client_id,
                entity_level: e.entity_level,
                publication_level: e.publication_level,
                journalist_level: e.journalist_level,
                city_level: e.city_level,
                keyword_level: e.keyword_level,
                graph_type: e.graph_type,
                spokesperson_level: e.spokesperson_level,
                profiling_level: e.profiling_level,
                visibility_level: e.visibility_level
            })
        })
    });

    Promise.all([addUploadDetails, addSetting, data.map(async (e, index) => {
        const art = parseInt(e['article id']);
        if (art !== 0 && !isNaN(art)) {

            articalService.getAll(req.body.client_id, e['article id'], e['company name'], e['media type']).then( async(dbdata) => {
                const state_name = states.filter(state => state.city === e['edition']);
                const edition =  e['media type'] === "Print" ? await articalService.getEdition(e['edition']) : {id: null};
                qa_data = {
                        
                        state_name: state_name[0].state,              
                        article_id: e['article id'],
                        client_id: req.body.client_id,
                        media_type: e['media type'],
                        photo_mention: e['photo'],
                        headline: e['headline'],
                        headline_mention: e['headline mention'],
                        prominence: e['prominence'],
                        tonality: e['tonality'],
                        vertical: e['vertical'],
                        EV: e['ev'],
                        theme: e['theme'],
                        keyword_level_1: e['keyword_level_1'],
                        Topic: e['topic'],
                        publication_type: e['publication type'],
                        publication: e['publication'],
                        language: e['language'],
                        category_A: e['category'],
                        visibility_score: e['visibility score'],
                        circulation_web_weightage: e["cir ('000) & web wtg"],
                        co_score: e['co score'],
                        edition: e['edition'],
                        publish_date: moment(e['publish date']).format('YYYY-MM-DD'),
                        mav: e['mav'],
                        ccm: e['ccm'],
                        word_count: e['word count'],
                        press_release: e['press release'],
                        page_no: e['page no'],
                        circlation: e['circulation'],
                        zone: e['zone'],
                        link: e['undefined'],
                        website_url: e['undefined'],
                        month_name: e['month'],
                        monthly_visits: e['monthly visitors*'],
                        total_CCMs: e['total ccms'],
                        client_article_type: e['article type'],
                        photo_weightage: e['photo weightage'],
                        headline_weightage: e['headline weightage'],
                        prominence_weightage: e['prominence weightage'],
                        word_count_weightage: e['word count wtg'],
                        front_Page_weightage: e['front page'],
                        index_weightage: e['index'],
                        source_name: e['journalist'],
                        entity_name: e['company name'],
                        prominence: e['prominence'],
                        client_name : req.body.client_name,
                        edition_id: edition?.id
                    }
                if(e['media type'] === 'Print'){
                    const [print_data, created] = dbdata;
                    if(print_data){
                    qa_data.publication_id = print_data.dataValues.publication_id;
                    // qa_data.edition_id = print_data.dataValues.edition_id,
                    qa_data.publication_type_id = print_data.dataValues.publication_type_id
                    qa_data.language_id = print_data.dataValues.language_id
                    qa_data.suppliment_id= print_data.dataValues.suppliment_id,
                    qa_data.source_id = print_data.dataValues.source_id
                    qa_data.cav_id = print_data.dataValues.cav_id
                    qa_data.entity_id = print_data.dataValues.entity_id
                    qa_data.zone_id = print_data.dataValues.zone_id
                    qa_data.prominent_id = print_data.dataValues.prominent_id
                    qa_data.section_id = print_data.dataValues.section_id
                    }
                    else{

                    }
                }
                if(e['media type'] === 'Online'){
                   const [online_data, created] = dbdata;
                   if(online_data) {
                   qa_data.publication_id = online_data.dataValues.publication_id;
                    // qa_data.edition_id = online_data.dataValues.edition_id,
                    qa_data.publication_type_id = online_data.dataValues.publication_type_id
                    qa_data.language_id = online_data.dataValues.language_id
                    qa_data.suppliment_id= online_data.dataValues.suppliment_id,
                    qa_data.source_id = online_data.dataValues.source_id
                    qa_data.cav_id = online_data.dataValues.cav_id
                    qa_data.entity_id = online_data.dataValues.entity_id
                    qa_data.zone_id = online_data.dataValues.zone_id
                    qa_data.prominent_id = online_data.dataValues.prominent_id
                    qa_data.section_id = online_data.dataValues.section_id
                   }
                }
                // console.log('qa_data', qa_data)
                await articalService.createQaData(qa_data).then(async (q_articles) => {
                    // const [q_articles, created] = q_articles;
                    console.log('created', q_articles)
                    // if(created === false) {
                    //     await articalService.updateQaData(qa_data, q_articles)
                    // }
                    if(q_articles){
                        const spokesman = Object.entries(e).filter((e, v) => e[0].match(/spokesperson [0-9]/g) && e[1] !== 0)
                        if (spokesman.length !== 0) {
                            spokesman?.filter(async (s) => {
                                const sperson = {
                                    spokesperson_name: s[1]
                                }
                                await articalService.createQaSpokesPerson(sperson).then(async (sps) => {
                                    const [sporkepeople, created] = sps;
                                
                                    const spersondata = {
                                        spokesperson_id: sporkepeople.id,
                                        q_article_id: q_articles?.id,
                                        spokesperson_profiling: e['spokesperson profiling']
                                    }
                                    await articalService.createQaDataSpokesPerson(spersondata)
                                })

                            })
                        }
                        const products = Object.entries(e).filter((e, v) => e[0].match(/product name [0-9]/g) && e[1] !== 0)
                        if (products.length !== 0) {
                            products?.filter(async (p) => {
                                const product = {
                                    product_name: p[1]
                                }
                                await articalService.createQaClientProduct(product).then(async (pro) => {
                                    const [products, created] = pro;
                                    
                                    const spersondata = {
                                        product_id: products.id,
                                        q_article_id: q_articles?.id
                                    }
                                    await articalService.createQaDataProduct(spersondata)
                                })

                            })
                        }
                    }
                });

            })
        }

    })]).then((values) => {
        console.log('values',values); // [3, 1337, "foo"]
      });

    res.json({ message: 'Artical upload processing', data: {} });
}


// for custom multer storage
let upload = multer({
    storage: storageCustom({
        key: function (req, file, cb) {
            cb(null, fullPath)
        }
    })
})


exports.processExcel = function (req, res) {
    // add writer stream variable in req so it can be accessed from custom storage
    // req.xlsxWriter = new XLSXWriteStream();
    let u = upload.single('upload');

    // console.log("starting upload")
    // u(req, res, (err) => {
    //     if (err) {
    //         console.log(err)
    //         // An error occurred when uploading
    //         return res.send({
    //             success: false,
    //             message: err.message
    //         });

    //     }
    //     res.json({ message: 'Artical successfully uploded' })       
    // })
    var data = [];
    var sheetHeader;
    var workbook = XLSX.readFile(req.file.path);
    var sheet_name_list1 = workbook.SheetNames;
    let sheet_name_list = [];
    sheet_name_list.push(sheet_name_list1[0]);
    sheet_name_list.forEach(function (y) {
        var worksheet = workbook.Sheets[y];
        var a = {};
        var headers = {};
        // var data = [];
        var result = [];
        for (z in worksheet) {
            if (z[0] === '!') continue;
            //parse out the column, row, and value
            var tt = 0;
            for (var i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            var col = z.substring(0, tt);
            var row = parseInt(z.substring(tt));
            var value = worksheet[z].v;

            //store header names
            if (row == 1 && value) {
                headers[col] = value.toLowerCase();
                sheetHeader = headers;
                continue;
            }

            if (!data[row]) data[row] = {};
            data[row][headers[col]] = value;
        }
        data.shift();
        data.shift();
    });
}

exports.addSetting = async function(req, res, next) {
    articalService.addSetting(req.body)
       .then((setting) =>{
           res.json({setting: setting, message: 'Setting added successful' })
       })
       .catch(next);
}

exports.getSetting = async function(req, res, next) {
    articalService.getSetting(req.params.client_id)
   .then(data => {
       res.json({settings: data, message: "Client setting fetched successfully"});
   })
   .catch(next);
}

exports.getSetting = async function(req, res, next) {
    articalService.getSetting(req.params.client_id)
   .then(data => {
       res.json({settings: data, message: "Client setting fetched successfully"});
   })
   .catch(next);
}

exports.getQualitativeCheck = async function(req, res, next) {
    articalService.getQualitativeCheck(req.params.client_id)
   .then(data => {
       res.json({qualitative: data > 0 ? true : false , message: "Client Qualitative fetched successfully"});
   })
   .catch(next);
}
