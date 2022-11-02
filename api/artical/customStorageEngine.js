var excel = require('excel-stream'); // package to read excel to objects in stream
const { number } = require('joi');
const { Transform } = require('stream');
const articalService = require('./artical.service');
const StringDecoder = require('string_decoder').StringDecoder

function getDestination(req, file, cb) {
    cb(null, '')
}

function MyCustomStorage(opts) {
    this.getDestination = (opts.destination || getDestination)
}

MyCustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {

    var options = {
        delimiter : '\t', // default is ,
        // endLine : '\n', // default is \n,
        columns : ['Article ID', 'Company Name', "Month", "Publish Date", "Publication", "Edition", "State", "Media Type", "Publication Type", "Publication - Edition", "Category", "Language", "Headline", "Monthly Visitors*", "Page No", "Journalist", "Agency", "Press Release", "CCM", "MAV", "Circulation", "Zone", "Word Count", "Link", "NA", "Total CCMs", "Photo", "Headline Mention", "Prominence", "Tonality", "Vertical", "EV", "Theme"], // by default read the first line and use values found as columns
        // columnOffset : 2, // default is 0
        // escapeChar : '"', // default is an empty string
        // enclosedChar : '"' // default is an empty string
    }
    // set input stream for xlsxWriter stream which will be used to downlaod excel
    req.xlsxWriter.setInputStream(
        // stream of input file
        file.stream
            // convert excel to object stream
            .pipe(excel(options))
            //process object stream and return formated object for xlsxWriter
            .pipe(getTransformObject(req.body))
    );
    cb(null, {
        path: '',
        size: 0
    })
}

MyCustomStorage.prototype._removeFile = function _removeFile(req, file, cb) {
    fsImpl.unlink(file.path, cb)
}

module.exports = function (opts) {
    return new MyCustomStorage(opts)
}

function getTransformObject(clientdata) {
    const jsonToDb = new Transform({
        writableObjectMode: true,
        readableObjectMode: true,
        transform(chunk, encoding, callback) {

            console.log('chunk', chunk)
            console.log('encoding', encoding)
            // to check current memory usage
            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            // console.log('\033c');
            // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
            // records is blank array decalred below 
            this.records.push(chunk);
            // batch processing of records
            if (this.records.length == 10) {
                saveDataToDB(this.records, clientdata)
                    .then((data) => {
                        // data is modified data
                        data.forEach((record) => {
                            this.push([...Object.values(record)])
                        })
                        // reset records for batch processing
                        this.records = [];
                        callback();
                    })
            }
            else {
                callback();
            }
        },
        decodeStrings: false,
        flush(done) {
            // flush we repeat steps for last records,
            // eg total records 108, last 8 records are left to process
            if (this.records.length > 0) {
                saveDataToDB(this.records, clientdata)
                    .then((data) => {
                        data.forEach((record) => {
                            this.push([...Object.values(record)])
                        })
                        this.records = [];
                        console.log('done processing m')
                        done();
                    })
            } else {
                console.log('done processing')
                done();
            }
        }
    });
    jsonToDb.records = [];
    return jsonToDb;
}

// async function to process data
function saveDataToDB(array, clientdata) {
   
    // console.log('qa_data', qa_data)
    let qa_data = {};
    return new Promise(async(resolve, reject) => {
        setTimeout(async() => {
            array.filter(async(e) => {
                // console.log(e)
                const art = parseInt(e['Article ID']);
                if(art !== 0 && !isNaN(art)){
                qa_data = {
                article_id : e['Article ID'],
                client_id: clientdata.client_id,
                media_type: e['Media Type'],
                agency: e['Agency'],
                photo: e['Photo'],
                headline: e['Headline'],
                prominence: e['Prominence'],
                tonality: e['Tonality'],
                vertical: e['Vertical'],
                EV: e['EV'],
                theme: e['Theme'],
                keyword_level_1: e['Keyword_Level_1'],
                Topic: e['Topic'],
                publication_type: e['Publication Type'],
                publication: e['Publication'],
                language: e['Language'],
                category_A: e['Category'],
                visibility_score: e['Visibility score'],
                circulation_web_weightage : e["Cir ('000) & Web Wtg"],
                co_score : e['Co Score'],
                edition: e['Edition'],
                publish_date: e['Publish Date'],
                mav: e['MAV'],
                ccm: e['CCM'],
                word_count: e['Word Count'] === 'N/A' ? 0 : e['Word Count'],
                press_release: e['Press Release'],
                page_no: e['Page No'],
                circlation: e['Circulation'],
                zone: e['Zone'],
                link: e['Link'],
                month_name: e['Month'],
                monthly_visits: e['Monthly Visitors*'],
                total_CCMs: e['Total CCMs'],
                client_article_type: e['Article Type'],
                photo_weightage: e['Photo Weightage'],
                headline_weightage: e['Headline Weightage'],
                prominence_weightage: e['Prominence Weightage'],
                word_count_weightage: e['Word Count Wtg'],
                front_Page_weightage: e['Front Page'],
                index_weightage: e['Index']
            }
            // console.log('qa_data', qa_data)
            // await articalService.createQaData(qa_data).then(async(artical) => {
            //     const [q_articles, created] = artical;
               
            //     const spokesman = Object.entries(e).filter((e,v) => e[0].match(/Spokesperson [0-9]/g) && e[1] !== 0 )
            //     if(spokesman.length !== 0){
            //         spokesman?.filter(async (s) => {
            //             const sperson = {
            //                 spokesperson_name: s[1]
            //             }
            //             await articalService.createQaSpokesPerson(sperson).then(async(sp) =>{
            //                 const spersondata = {
            //                     spokesperson_id : sp.id,
            //                     q_article_id: q_articles.id,
            //                     spokesperson_profiling : e['Spokesperson Profiling']
            //                 }
            //                 await articalService.createQaDataSpokesPerson(spersondata)
            //             })
                        
            //         })
            //     }
            //     const products =  Object.entries(e).filter((e,v) => e[0].match(/Product Name [0-9]/g) && e[1] !== 0)
            //     if(products.length !== 0){
            //         products?.filter(async (p) => {
            //             const product = {
            //                 product_name: p[1]
            //             }
            //             await articalService.createQaClientProduct(product).then(async(pro) =>{
            //                 const spersondata = {
            //                     product_id : pro.id,
            //                     q_article_id: q_articles.id
            //                 }
            //                 await articalService.createQaDataProduct(spersondata)
            //             })
                        
            //         })
            //     }
            // })
            }
       

            })
            resolve(array.map(e => ({ ...e, id: Math.floor((Math.random() * 10) + 1) })))
        }, 10)
    })
}