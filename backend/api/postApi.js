const router = require('express').Router()
    jwt = require('jsonwebtoken'),
    verifyToken = require("../helper"),
    knex = require('../db/knex');


/*
|--------------------------------------------------------------------------
|  Posts Api - Gets posts from all users with all info
|--------------------------------------------------------------------------
*/
router.get("/", verifyToken, async (request, response) => {

    // console.log("************************")
    // console.log(request.userId);
    // console.log("************************")

    await knex.select("posts.id", "users.id AS userId", "username", "photo", "caption", "profilePic")
        .from("posts")
        .innerJoin('users', 'posts.user_id', 'users.id')
        .then(post => {



            // We use this to add the totalLikes property to each post
            // We also use this to add an array of comments on each
            post.forEach((element, index, array) => {
                element.totalLikes = 0;
                element.comments = [];
                element.isSaved = false;
               

            })



            var savedPost = knex("saved")
            .where({
                userId: request.userId,
            })
            .then(savedPost => {



                    

                        for(let i = 0; i < savedPost.length; i++){
                            for(let x = 0; x < post.length; x++ ) {

                                if(savedPost[i].postId === post[x].id) {
                                    post[x].isSaved = true;
                                }
                            }
                        }
                    
            })
            .catch(error => console.log(error))





            // get all likes, match it to post, the push in that posts comments array
            var allComments = knex.select("comments.id", "comment", "users.id As users_id", "username", "postId", )
                .from("comments")
                .innerJoin("users", "comments.userId", "users.id")
                .then(comment => {

                    console.log(comment);

                    for(let i = 0; i < post.length; i++) {

                        for(let x = 0; x < comment.length; x++){

                            // console.log("In the for loop inside comments")
                            // console.log(post[i])
                            
                            if(comment[x].postId === post[i].id) {
                                // console.log(`Post username: ${post[i].username}`)

                                // adds username from posts to 
                                // comment[x].username = post[i].username;
                                console.log("____________");
                                console.log(comment[x]);
                                console.log("____________");
                                // pushs comment array to the users array
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

});




/*
|--------------------------------------------------------------------------
|   Get one post
|--------------------------------------------------------------------------
*/
router.get('/:id', verifyToken, (request, response) => {

    var userId = parseInt(request.params.id);

    knex.select("posts.id", "users.id AS mainUserId", "photo", "username", "caption", "profilePic")
        .from("posts")
        .where('posts.user_id', userId)
        .innerJoin("users", "posts.user_id", "users.id")
        .then(user => {
            response.status(200).json(user)
        })
        .catch(error => console.log(error));

});





/*
|--------------------------------------------------------------------------
|   Get one post
|--------------------------------------------------------------------------
*/
router.post("/addPost", verifyToken, (request, response) => {


    // .createTable("posts", (table) => {
    //     table.increments();
    //     table.text("photo").notNullable().defaultTo("https://jlfarchitects.com/wp-content/uploads/2015/03/img-placeholder-300x300.jpg");
    //     table.text("caption").notNullable();
    //     table.integer("user_id").unsigned().references("id").inTable("users").onDelete("cascade");
    //     table.timestamp("date_created").defaultTo(knex.fn.now());
    // })

    knex("posts")
        .insert({
            photo: request.body.photo,
            caption: request.body.caption,
            user_id: request.userId
        })
        .then(() => response.status(200).json({ message: "Successfully added a new post"}))
        .catch(error => console.log(error));

});







module.exports = router;