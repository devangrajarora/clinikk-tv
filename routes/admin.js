const content = require('../models/content');
const users = require('../models/user');
const to = require('../utils/to');
const router = require('express').Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

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

router.uploadContent = async(req, res) => {

    try{
        upload(req, res, async err => {
            if(err) res.sendError(err);

            if(req.session.access === 'undefined' || req.session.access === '0') {
                return res.sendError(null, `User doesn't have access to upload content`);
            }

            const newContent = new content({
                title: req.body.title.trim(),
                description: req.body.description.trim(),
                category: req.body.category,
                likes: 0,
                content_link: req.file.location,
                uploaded_at: new Date().toDateString(),
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
        return res.sendError(err);
    }
    
};

module.exports = router;