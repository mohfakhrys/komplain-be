const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password:"123",
    database:"complain",
    host:"localhost",
    port:5432,
});

module.exports = pool