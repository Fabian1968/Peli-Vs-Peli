var mysql = require('mysql');

//CREAMOS LA CONEXIÓN A LA BD
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Acamica1968**",
    database: "competencias"
});

module.exports = connection;