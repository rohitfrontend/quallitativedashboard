const express = require('express');
const reader = require('xlsx')


const multer = require('multer')
const XLSXWriteStream = require('xlsx-write-stream');
const storageCustom = require('./customStorageEngine')




// function saveArtical(req, res, next) {

  
// // Reading our test file
// const file = reader.readFile(req.file.path)
//   console.log(file)
// let data = []
  
// const sheets = file.SheetNames
  
// for(let i = 0; i < sheets.length; i++)
// {
//    const temp = reader.utils.sheet_to_json(
//         file.Sheets[file.SheetNames[i]])
//    temp.forEach((res) => {
//       data.push(res)
//    })
// }
  
// Printing data
// console.log(data)
    // console.log(req.file)
    // console.log(req.body)
    // articalService.create(req.body)
    //     .then(() => res.json({ message: 'Artical successful' }))
    //     .catch(next);
// }


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
    req.xlsxWriter = new XLSXWriteStream();
    let u = upload.single('file');

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
        res.json({ message: 'Artical successfully uploded' })       
    })
}
