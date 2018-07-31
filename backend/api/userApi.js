/*
|--------------------------------------------------------------------------
|  Dependencies
|--------------------------------------------------------------------------
*/

const router = require("express").Router(),
    jwt = require("jwt-simple"),
    expressJwt = require("express-jwt"),
    crypto = require("crypto"),
    knex = require("../db/knex.js");

    

let encrypt = (password => {
  return crypto.pbkdf2Sync(password, "salt", 10, 512, "sha512")
  .toString("base64");
});

// let decrypt = crypto.pbkdf2Sync(a,'salt', 10, 512, 'sha512').toString('base64');





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
            .then( user => { response.status(200).send(user)})
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
        .then(user => {
            response.status(200).json(user);
        })
        .catch(error => {
            console.log(error);
        })
})



module.exports = router;