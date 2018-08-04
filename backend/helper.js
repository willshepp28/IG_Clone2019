const express = require("express"),
    jwt = require("jsonwebtoken");





    // Verify Token
module.exports.verifyToken = function ( request, response, next) {

    // Get auth header value
    const bearerHeader = request.headers['authorization'];

    // Check if bearer is undefined
    if( typeof bearerHeader !== 'undefined') {

        // Split at the space
        const bearer = bearerHeader.split(' ');

        // Get token from array
        const bearToken = bearer[1];
        request.token = bearToken;
        console.log("success")
        next();

    } else {
        
        // Forbidden
        response.json({
            message: "Permission denied"
        })
    }


}

module.exports.verifyToken2 = function( request, response, next) {

    if(!request.headers.authorization) {
        return response.status(401).send("Unauthorized request");
    }

    let token = request.headers.authorization.split(' ')[1];
     if( token === "null") {
        return response.status(401).send("Unauthorized request")
    }

    let payload = jwt.verify(token, "ultrasupersecret");
    if(!payload) {
        return response.status(401).send("Unauthorized request");
    }

    request.userId = payload.subject
    next();
}