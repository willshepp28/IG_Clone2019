/*
|--------------------------------------------------------------------------
|  Dependencies
|--------------------------------------------------------------------------
*/

const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    { JWT_SECRET_KEY } = require('../secret/config'),
    crypto = require("crypto"),
    knex = require("../db/knex.js");



let encrypt = (password => {
    return crypto.pbkdf2Sync(password, "salt", 10, 512, "sha512")
        .toString("base64");
});



function verifyToken(request, response, next) {

    if (!request.headers.authorization) {
        console.log("Because you have no request.headers.auth")
        return response.status(401).send('Unauthorized request');

    }

    let token = request.headers.authorization.split(' ')[1];


    if (token === "null") {
        console.log("Because req.headers/auth is null")
        return response.status(401).send("Unauthorized request");
    }

    let payload = jwt.verify(token, JWT_SECRET_KEY);

    if (!payload) {
        console.log("Because you have no payload")
        return response.status(401).send("Unauthorized request");
    }


    request.userId = payload.user[0].id;
   
    next();
}


router.get("/", (request, response) => {

    var decrypt = crypto.pbkdf2Sync("123", 'salt', 10, 512, 'sha512').toString('base64');


});


/*
|--------------------------------------------------------------------------
|  Login Api - Page where users login 
|--------------------------------------------------------------------------
*/


router.post("/login", (request, response) => {

    var decrypt = crypto.pbkdf2Sync(request.body.password, 'salt', 10, 512, 'sha512').toString('base64');

    if (request.body.username && request.body.password) {

        let user = knex.select()
            .from("users")
            .where({ username: request.body.username, password: decrypt })
            .then(user => {



                if (user === 0) {
                    response.status(401).send("No user")
                } else {
                    let token = jwt.sign({ user }, JWT_SECRET_KEY)
                    response.status(200).send({ token });
                }

            })
            .catch(error => {
                console.log(error);
                response.status(401).send("Invalid password")
            });
    }


});





/*
|--------------------------------------------------------------------------
|  Signup Api - Page where users login 
|--------------------------------------------------------------------------
*/

router.post("/signup", (request, response) => {



    var userData = knex("users")
        .insert({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password
        })
        .returning('id')
        .then(user => {

            console.log(user);

            let token = jwt.sign({ user }, JWT_SECRET_KEY)
            let payload = jwt.verify(token, JWT_SECRET_KEY);
            console.log(payload);
            response.status(200).send({ token });
        })
        .catch(error => {
            console.log(error);
        })
});



router.get("/posts", verifyToken, async (request, response) => {

    console.log("************************")
    console.log(request.userId);
    console.log("************************")

    await knex.select("posts.id", "users.id AS userId", "username", "photo", "caption", "profilePic")
        .from("posts")
        .innerJoin('users', 'posts.user_id', 'users.id')
        .then(post => {



            // We use this to add the totalLikes property to each post
            post.forEach((element, index, array) => {
                element.totalLikes = 0;
                //   console.log(element);
            })


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


router.get("/likes", (request, response) => {

    let likes = knex.select()
        .from("likes")
        .then(like => {
            return response.json(like);
        })
        .catch(error => {
            console.log(error);
            return response.status(401).send("Didnt recieve likes");
        })
});


router.post("/likes", verifyToken, (request, response) => {
   

    var postLike = knex("likes")
        .where({
            postId: request.body.id,
            userId: request.userId
        })
        .then(likes => {

        //    console.log(likes);

           console.log(`You have ${likes.length} likes`)


            // if their are posts returned from the database
            // create posts
            if (likes.length === 0) {
                console.log("You dont have likes")

                // adds like
                var addLike = knex("likes")
                    .insert({
                        postId: request.body.id,
                        userId: request.userId
                    })
                    .then(()=> response.status(200).json("added like"))
                    .catch(error => console.log(error));
            }


            // if their are posts returned from the database
            // delete posts
            if (likes.length > 0) {
                console.log("You have likes")
            
            var deleteLike = knex("likes")
                .where({
                    postId: request.body.id,
                    userId: request.userId
                })
                .del()
                .then(() => response.status(200).json("Deleted like"))
                .catch(error => {
                    console.log(error);
                    response.sendStatus(401);
                })


            }
        
        })
    .catch(error => console.log(error))

})







module.exports = router;