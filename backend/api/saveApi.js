const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("../helper"),
    knex = require("../db/knex");



/* 
    1. Get all saved posts
    2. Add a saved post
    3. Delete a saved post

*/

router.route("/")
    .get((request, response) => {
       knex.select()
        .from("savedPost")
        .then(savedPost => {
            response.status(200).json(savedPost);
        })
        .catch(error => console.log(error))
    })



module.exports = router;