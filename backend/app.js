/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */

 const express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    path = require("path"),
    morgan = require("morgan"),
    Api = require("./api/Api"),
    likesApi = require("./api/likesApi"),
    postApi = require("./api/postApi"),
    commentsApi = require("./api/commentsApi"),
    followerApi = require("./api/followApi"),
    savedApi = require("./api/saveApi"),
    port = process.env.PORT || 3000;

application = express();





/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/

application.use(morgan('dev'));
// application.use(morgan('combined'))

// parse application/json
application.use(bodyParser.json());
// parse application/x-www-form-urlencoded
application.use(bodyParser.urlencoded({ extended: false }));


application.use(cors())



// Express will allow requests from port 8080
// 8080 needs access to our json data
// application.use(cors({
//     origin: 'http://localhost:4200',
//     optionsSuccessStatus: 200
//   }));






/*
|--------------------------------------------------------------------------
| Api
|--------------------------------------------------------------------------
*/
application.use("/api/v1/savedPost", savedApi)
application.use("/api/v1/follower", followerApi);
application.use("/api/v1/comments", commentsApi);
application.use("/api/v1/posts", postApi);
application.use('/api/v1/likes', likesApi);
application.use("/api/v1", Api);




/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/
application.listen( port, () => {
    console.log(`Server listening on port ${port}`);
})