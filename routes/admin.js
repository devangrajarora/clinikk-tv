const content = require('../models/content');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

let exp = {}

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3();

const limits = { fileSize: 1024 * 1024 * 512 }; // 512 MB

const allowedMimetypes = new Set([
    'audio/mpeg', // mp3
    'video/mp4', // mp4
    'image/jpeg',
    'image/png',
    'image/jpg',
]);

// http://expressjs.com/en/resources/middleware/multer.html

const fileFilter = (req, file, cb) => {

    if(req.session.access != '1') {
        cb(new Error(`User doesn't have accces to upload`, false));
    }

    if (allowedMimetypes.has(file.mimetype)) {
        cb(null, true); // accept file
    } else {
        cb(new Error('Unsupported format'), false);
    }
};

const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: process.env.AWS_BUCKET,
        contentType: function (req, file, cb) {
            cb(null, file.mimetype); // gives mimetype of file
        },
        contentDisposition: 'inline',
        key: function (req, file, cb) { // returns name of the file
            console.log('Uploading..');
            console.log(file);
            cb(null, new Date().toISOString() + "-" + file.originalname, err => {
                if (err) console.log(err);
            });
        }
    }),
    limits: limits
}).single("file"); // accept a single file which will be stored in req.file

exp.uploadContent = async(req, res) => {

    try{
        upload(req, res, async err => {
            if(err) res.sendError(err);

            const newContent = new content({
                title: req.body.title.trim(),
                description: req.body.description.trim(),
                category: req.body.category,
                likes: 0,
                content_link: req.file.location,
                uploaded_at: new Date().toISOString(),
                uploaded_by: req.session.email
            });

            let result = await newContent.save();

            if(!result) {
                return res.sendError(null, 'Some error occured');
            } else {
                return res.sendSuccess(newContent);
            }
        })
    } catch(err) {
        return res.sendError(null,err);
    }
    
};

module.exports = exp;