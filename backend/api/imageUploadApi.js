const router = require("express").Router();
    jwt = require("jsonwebtoken"),
    verifyToken = require("../helper"),
    knex = require("../db/knex");




router.post("/changeProfile", (request, response) => {
    console.log(request.body);
    response.status(200).json(request.body);
});


module.exports = router;