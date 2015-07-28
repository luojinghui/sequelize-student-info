var mysql = require('mysql');

function connectMysql() {
    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'student',
        port : 3306
    });
}

module.exports = connectMysql;
