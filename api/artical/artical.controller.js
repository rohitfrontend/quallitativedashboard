const express = require('express');
const reader = require('xlsx')
const articalService = require('./artical.service');
const moment = require('moment');

const multer = require('multer')
const XLSXWriteStream = require('xlsx-write-stream');
const storageCustom = require('./customStorageEngine')

var XLSX = require('xlsx');


exports.getArtical = async function (req, res, next) {
    console.log('munish');
    articalService.getAll(8, 221482940, 'Ashok Leyland').then((data) => {
        console.log('data', data)
        res.json({ data: data, message: 'Artical successful' })
    })
}
exports.saveArtical = async function (req, res, next) {
    var f = req.files["upload"]; // <input type="file" id="upload" name="upload">
    var workbook = XLSX.readFile(f.path, { 'type': 'base64', cellDates: true, raw: true });
    var data = [];
    var sheetHeader;
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
            var value = worksheet[z].v === 'Link' ? worksheet[z].l?.Target : worksheet[z].v;
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

    let result = await Promise.all(data.map(async (e) => {
        const art = parseInt(e['article id']);
        if (art !== 0 && !isNaN(art)) {
            
            articalService.getAll(req.fields.client_id, e['article id'], e['company name'], e['media type']).then( async(dbdata) => {

                qa_data = {
                        // publication_id: dbdata[0].publication_id,
                        // edition_id: dbdata[0].edition_id,
                        // publication_type_id: dbdata[0].publication_type_id,
                        // language_id: dbdata[0].language_id,
                        // suppliment_id: dbdata[0].suppliment_id,
                        // source_id: dbdata[0].source_id,    
                        // cav_id: dbdata[0].cav_id,
                        // client_name: dbdata[0].client_name,
                        // entity_id: dbdata[0].entity_id,  
                        // zone_id: dbdata[0].zone_id,
                        // prominent_id: dbdata[0].prominent_id,
                        // section_id: dbdata[0].section_id,              
                        article_id: e['article id'],
                        client_id: req.fields.client_id,
                        media_type: e['media type'],
                        agency: e['agency'],
                        photo_mention: e['photo mention'],
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
                        publish_date1: e['publish date'],
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
                        prominence: e['prominence']
                    }
                if(e['media type'] === 'Print'){
                    const [print_data, created] = dbdata;
                    if(print_data){
                    qa_data.publication_id = print_data.dataValues.publication_id;
                    qa_data.edition_id = print_data.dataValues.edition_id,
                    qa_data.publication_type_id = print_data.dataValues.publication_type_id
                    qa_data.language_id = print_data.dataValues.language_id
                    qa_data.suppliment_id= print_data.dataValues.suppliment_id,
                    qa_data.source_id = print_data.dataValues.source_id
                    qa_data.cav_id = print_data.dataValues.cav_id
                    qa_data.client_name = req.fields.client_name
                    qa_data.entity_id = print_data.dataValues.entity_id
                    qa_data.zone_id = print_data.dataValues.zone_id
                    qa_data.prominent_id = print_data.dataValues.prominent_id
                    qa_data.section_id = print_data.dataValues.section_id
                    }
                }
                if(e['media type'] === 'Online'){
                   const [online_data, created] = dbdata;
                   if(online_data) {
                   qa_data.publication_id = online_data.dataValues.publication_id;
                    qa_data.edition_id = online_data.dataValues.edition_id,
                    qa_data.publication_type_id = online_data.dataValues.publication_type_id
                    qa_data.language_id = online_data.dataValues.language_id
                    qa_data.suppliment_id= online_data.dataValues.suppliment_id,
                    qa_data.source_id = online_data.dataValues.source_id
                    qa_data.cav_id = online_data.dataValues.cav_id
                    qa_data.client_name = req.fields.client_name
                    qa_data.entity_id = online_data.dataValues.entity_id
                    qa_data.zone_id = online_data.dataValues.zone_id
                    qa_data.prominent_id = online_data.dataValues.prominent_id
                    qa_data.section_id = online_data.dataValues.section_id
                   }
                }
                
                await articalService.createQaData(qa_data).then(async (artical) => {
                    const [q_articles, created] = artical;

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
                                    q_article_id: q_articles.id,
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
                                    q_article_id: q_articles.id
                                }
                                await articalService.createQaDataProduct(spersondata)
                            })

                        })
                    }
                });

            })
        }

    }))

    res.json({ message: 'Artical successfully uploded', data: {} });
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

exports.processExcels = function (req, res) {
    // add writer stream variable in req so it can be accessed from custom storage
    req.xlsxWriter = new XLSXWriteStream();
    let u = upload.single('upload');

    console.log("starting upload")
    u(req, res, (err) => {
        if (err) {
            console.log(err)
            // An error occurred when uploading
            return res.send({
                success: false,
                message: err.message
            });

        }

        //write excel file stream to res
        const xlsxStream = req.xlsxWriter.getOutputStream();
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=test.xlsx");
        
        xlsxStream.pipe(res);

    })
}