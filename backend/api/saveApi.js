const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("../helper"),
    knex = require("../db/knex");



/* 
    1. Get all saved posts
    2. Add a saved post
    3. Delete a saved post

*/

   // .createTable("savedPost", (table) => {
    //     table.increments();
    //     table.integer("userId").unsigned().references("id").inTable("users");
    //     table.integer("postId").unsigned().references("id").inTable("posts");
    // })

router.route("/")
    .get((request, response) => {
       knex.select()
        .from("saved")
        .then(savedPost => {
            response.status(200).json(savedPost);
        })
        .catch(error => console.log(error))
    })
    .post(verifyToken,(request, response) => {

        console.log(request.body.id);
        
        knex("saved")
            .insert({
                userId: request.userId,
                postId: request.body.id
            })
            .then(() => response.status(200).json({ message: "Successfully saved post"}))
            .catch(error => console.log(error));
            
    })



module.exports = router;