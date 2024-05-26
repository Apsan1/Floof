const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // No password
    database: 'floof'
});

module.exports = pool.promise();
