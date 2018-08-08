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
    port = process.env.PORT || 8000;

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

// application.use(cors());
application.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});




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
application.use("/api/v1", Api);




/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/
application.listen( port, () => {
    console.log(`Server listening on port ${port}`);
})