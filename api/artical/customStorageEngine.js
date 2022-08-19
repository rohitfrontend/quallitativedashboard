var excel = require('excel-stream') // package to read excel to objects in stream
const { Transform } = require('stream');
const articalService = require('./artical.service');

function getDestination(req, file, cb) {
    cb(null, '')
}

function MyCustomStorage(opts) {
    this.getDestination = (opts.destination || getDestination)
}

MyCustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {

    // set input stream for xlsxWriter stream which will be used to downlaod excel
    req.xlsxWriter.setInputStream(
        // stream of input file
        file.stream
            // convert excel to object stream
            .pipe(excel())
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
            // to check current memory usage
            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            // console.log('\033c');
            // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
            // records is blank array decalred below 
            this.records.push(chunk);
            // batch processing of records
            console.log('this.records.length', this.records.length)
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
                        console.log('done processing')
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
    const qa_data = array.map(e => ({
        article_id : e['Article ID'],
        client_id: clientdata.client_id,
        media_type: e['Media Type'],
        agency: e['Agency'],
        total_CCMs: e['CCM'],
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
        headline: e['Headline'],
        mav: e['MAV'],
        category_A: e['Category'],
        visibility_score: e['Visibility score'],
        circulation_web_weightage : e["Cir ('000) & Web Wtg"],
        co_score : e['Co Score']
    }))
    // console.log('array',array)
    // console.log('qa_data', qa_data)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            array.filter(e => {
                if(e['Article ID'] !== 0){
                const qa_data = {
                article_id : e['Article ID'],
                client_id: clientdata.client_id,
                media_type: e['Media Type'],
                agency: e['Agency'],
                total_CCMs: e['CCM'],
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
                headline: e['Headline'],
                mav: e['MAV'],
                category_A: e['Category'],
                visibility_score: e['Visibility score'],
                circulation_web_weightage : e["Cir ('000) & Web Wtg"],
                co_score : e['Co Score']
            }
                articalService.createQaData(qa_data)
                const spokesman = Object.entries(e).filter((e,v) => e[0].match(/Spokesperson [0-9]/g) && e[1] !== 0 )
                if(spokesman.length !== 0){
                    spokesman?.filter(s => {
                        const sperson = {
                            spokesperson_name: s[1]
                        }
                        articalService.createQaSpokesPerson(sperson).then((sp) =>{
                            const spersondata = {
                                spokesperson_id : sp.id,
                                spokesperson_profiling : e['Spokesperson Profiling']
                            }
                            articalService.createQaDataSpokesPerson(spersondata)
                        })
                        
                    })
                }
                const products =  Object.entries(e).filter((e,v) => e[0].match(/Product Name [0-9]/g) && e[1] !== 0)
                if(products.length !== 0){
                    products?.filter(p => {
                        const product = {
                            product_name: p[1]
                        }
                        articalService.createQaClientProduct(product).then((pro) =>{
                            const spersondata = {
                                product_id : pro.id,
                            }
                            articalService.createQaDataProduct(spersondata)
                        })
                        
                    })
                }
            }

            })
            resolve(array.map(e => ({ ...e, id: Math.floor((Math.random() * 10) + 1) })))
        }, 10)
    })
}