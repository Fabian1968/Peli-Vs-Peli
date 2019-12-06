var con = require('../lib/conexionbd');

function cargarGeneros(req, res) {
    var sql = "SELECT * FROM genero";
    con.query(sql, (error, resultado, campos) => {
        if (error) {
            console.log("Hay un error en la consulta de géneros", error.message);
            return res.status(404).send("No se pueden obtener los géneros");
        }

        res.send(JSON.stringify(resultado));

    })
}

module.exports = {
    cargarGeneros: cargarGeneros,
}