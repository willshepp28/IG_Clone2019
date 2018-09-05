// update with you config settings.
module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/IG_Clone2019',
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/backend/db/migrations',
        },
        seeds: {
            directory: __dirname + '/backend/db/seeds',
        },
    }
  }