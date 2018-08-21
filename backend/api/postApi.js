const router = require('express').Router()
    jwt = require('jsonwebtoken'),
    verifyToken = require("../helper"),
    knex = require('../db/knex');


/*
|--------------------------------------------------------------------------
|  Posts Api - Gets posts from all users with all info
|--------------------------------------------------------------------------
*/
router.get("/posts", verifyToken, async (request, response) => {

    console.log("************************")
    console.log(request.userId);
    console.log("************************")

    await knex.select("posts.id", "users.id AS userId", "username", "photo", "caption", "profilePic")
        .from("posts")
        .innerJoin('users', 'posts.user_id', 'users.id')
        .then(post => {



            // We use this to add the totalLikes property to each post
            // We also use this to add an array of comments on each
            post.forEach((element, index, array) => {
                element.totalLikes = 0;
                element.comments = [];
                //   console.log(element);
            })



            // get all likes, match it to post, the push in that posts comments array
            var allComments = knex.select()
                .from("comments")
                .then(comment => {
                    console.log(comment);

                    for(let i = 0; i < post.length; i++) {

                        for(let x = 0; x < comment.length; x++){

                            // console.log("In the for loop inside comments")
                            // console.log(post[i])
                            
                            if(comment[x].postId === post[i].id) {
                                post[i].comments.push(comment[x]);
                            }
                        }
                        
                    }
                })



            // how we get likes
            var alllikes = knex.select()
                .from("likes")
                .then(likes => {
                    for (i = 0; i < likes.length; i++) {


                        // for(x =0; i < post.length;)
                        for (x = 0; x < post.length; x++) {

                            if (likes[i].postId === post[x].id) {
                                post[x].totalLikes += 1;
                                // console.log(post[x])
                            }
                        }
                    }

                    return response.json(post);

                })



        })
        .catch(error => {
            console.log(error);
            return response.status(401).send("no posts")
        })

})

module.exports = router;