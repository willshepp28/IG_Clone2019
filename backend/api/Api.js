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



router.get("/posts", verifyToken, ( request, response) => {

    let posts = [
        { id: 1, caption: "You da truth", userId: 3},
        { id: 2, caption: "Noooooooooooooo", userId: 2},
        { id: 3, caption: "Yessssssss", userId: 4}
    ];

    return response.json(posts);
}) 








module.exports = router;