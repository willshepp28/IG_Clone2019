const router = require('express').Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require('../helper');


    router.post("/", verifyToken, (request, response) => {
        /* 
            This is where users add comments to posts
        
            You will need the user.id from the request.userId
            And you will need the post.id included in the request.body
            Then insert the new comment in the database
        
            })
        */
        
            var comment = knex("comments")
                .insert({
                    comment: request.body.comment,
                    userId: request.userId,
                    postId: request.body.id
                })
                .then(() => response.status(200).json("comment added"))
                .catch(error => console.log(error));
        });
        


module.exports = router;