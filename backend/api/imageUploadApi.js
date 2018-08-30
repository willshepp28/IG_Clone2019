const router = require("express").Router(),
    AWS = require("aws-sdk"),
    multer = require("multer"),
    multerS3 = require('multer-S3'),
    jwt = require("jsonwebtoken"),
    verifyToken = require("../helper"),
    knex = require("../db/knex"),
    { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require("../secret/aws-config");


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './upload')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({
//     storage: storage
// })


// var upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'ig-clone-v1',
//         acl: 'public-read',
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString() + '.jpg')
//         }
//     })
// });

// AWS.config.loadFromPath('./secret/aws-config.js');
// AWS.config.update({ signatureVersion: 'v4' });

// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});


var s3 = new AWS.S3();


var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ig-clone2019',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, "profilePic/" + Date.now().toString() + '.jpg')
        }
    })
});


var uploadPost = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ig-clone2019',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, "posts/" + Date.now().toString() + '.jpg')
        }
    })
})



router.post("/changeProfile", verifyToken, upload.any(), (request, response) => {

    /*
        1. User adds a new profile picture
        2. We upload the image to amazon s3
        3. Then we replace users.profilePic with new image string
    */
    // knex("users")
    //     .where("users.id", request.userId)
    //     .update({
    //         profilePic: request.files[0].location
    //     })
    //     .then(() => response.status(200))
    //     .catch(() => console.log(error));
    console.log(request.files[0].location);

    var changeProfile = knex('users')
        .where('id', request.userId)
        .update({
            profilePic: request.files[0].location
        })
        .then(() => {
            response.status(200).json({ messgae: "Succesfully added a new profile picture" })
        })
        .catch((error) => console.log(error));
});





router.post("/postPhoto", verifyToken, uploadPost.any(), (request, response) => {
    /*
      1. User add a new post
      2. We upload the image to amazon s3
      3. Then we add a new post with image string to posts databse


       .createTable("posts", (table) => {
        table.increments();
        table.text("photo").notNullable().defaultTo("https://jlfarchitects.com/wp-content/uploads/2015/03/img-placeholder-300x300.jpg");
        table.text("caption").notNullable();
        table.integer("user_id").unsigned().references("id").inTable("users").onDelete("cascade");
        table.timestamp("date_created").defaultTo(knex.fn.now());
  */

 var newPost = knex("posts")
    .insert({
        photo: request.files[0].location,
        caption: request.body.caption,
        user_id: request.userId
    })
    .then(() => response.status(200).json({ message: "Successfully added a new post"}))
    .catch(() => console.log(error));

});


module.exports = router;