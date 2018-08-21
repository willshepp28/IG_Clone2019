const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("../helper"),
    knex = require("../db/knex");



/*

    1. Get all followers
    2. Request to follow
    3. Accept a follow request
    4. Unfollower a person user is following
*/


router.route("/:id")
    .get((request, response) => {
        console.log("***********")
        console.log(request.params.id);
        console.log("***********")
        knex.select()
            .from("follower")
            .where({
                followeeId: request.params.id,
                accept_request: false
            })
            .then(follower => {
                console.log(follower);
                response.status(200).json(follower)
            })
            .catch(error => console.log(error));
    });



module.exports = router;