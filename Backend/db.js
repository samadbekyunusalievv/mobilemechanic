const fs = require('fs');

const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: '5566',
    host: "localhost",
    port: 5432,
    database: "hackathon"
})





module.exports=pool

