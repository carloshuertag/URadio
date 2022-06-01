const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: process.env.dbHost,
        user: process.env.dbUser,
        password: process.env.dbPassword,
        database: process.env.database,
        multipleStatements: false
    },
    listPerPage: 10,
};
module.exports = config;