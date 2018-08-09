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

// let decrypt = crypto.pbkdf2Sync(a,'salt', 10, 512, 'sha512').toString('base64');


function verifyToken( request, response, next) {

    if( !request.headers.authorization) {
        console.log("Because you have no request.headers.auth")
        return response.status(401).send('Unauthorized request');

    }

    let token = request.headers.authorization.split(' ')[1];
   

    if ( token === "null") {
        console.log("Because req.headers/auth is null")
        return response.status(401).send("Unauthorized request");
    }

    let payload = jwt.verify( token, JWT_SECRET_KEY);

    if(!payload) {
        console.log("Because you have no payload")
        return response.status(401).send("Unauthorized request");
    }

    // console.log("____________");
    // console.log(payload.user[0].id);
    // console.log("____________");

    request.userId = payload.user[0].id;
    // request.userId = payload;
    next(); 
}


router.get("/", ( request, response ) => {

    var decrypt = crypto.pbkdf2Sync("123", 'salt', 10, 512, 'sha512').toString('base64');

    
});


/*
|--------------------------------------------------------------------------
|  Login Api - Page where users login 
|--------------------------------------------------------------------------
*/


router.post("/login", ( request, response) => {

    var decrypt = crypto.pbkdf2Sync(request.body.password, 'salt', 10, 512, 'sha512').toString('base64');

     if( request.body.username && request.body.password ) {

        let user = knex.select()
            .from("users")
            .where({ username: request.body.username , password: decrypt })
            .then( user => { 

       
               
                if(user === 0) { 
                    response.status(401).send("No user")
                } else {
                    let token = jwt.sign({ user }, JWT_SECRET_KEY )
                    response.status(200).send({ token });
                }
                
            })
            .catch( error => { 
                console.log(error);
                response.status(401).send("Invalid password")});
     }


});

// {
// 	"username": "diff",
// 	"email": "diff@gmail.com",
// 	"password": "477"
// }




/*
|--------------------------------------------------------------------------
|  Signup Api - Page where users login 
|--------------------------------------------------------------------------
*/

router.post("/signup", ( request, response) => {

  

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
            let payload = jwt.verify( token, JWT_SECRET_KEY);
            console.log(payload);
            response.status(200).send({ token });
        })
        .catch(error => {
            console.log(error);
        })
});



router.get("/posts", verifyToken, async( request, response) => {

 

    await knex.select("posts.id", "users.id AS userId", "username", "photo", "caption", "profilePic" )
        .from("posts")
        .innerJoin('users', 'posts.user_id', 'users.id')
        .then(post => {

        
        
        // We use this to add the totalLikes property to each post
         post.forEach((element, index, array ) => {
             element.totalLikes = 0;
            //   console.log(element);
         }) 
         

   var alllikes = knex.select()
         .from("likes")
         .then(likes => {
            for(i = 0; i < likes.length; i++) {
 

                // for(x =0; i < post.length;)
                for(x = 0; x < post.length; x++) {
            
                    if(likes[i].postId === post[x].id) {
                        post[x].totalLikes += 1;
                        console.log(post[x])
                    }
                }
            }

            return response.json(post);

         })

       
            
        })
        .catch( error => {
            console.log( error );
            return response.status(401).send("no posts")
        })

}) 


router.get("/likes", (request, response) => {

    let likes = knex.select()
        .from("likes")
        .then( like => {
            return response.json(like);
        })
        .catch( error => {
            console.log(error);
            return response.status(401).send("Didnt recieve likes");
        })
});







module.exports = router;