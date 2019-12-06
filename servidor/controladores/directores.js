var con = require('../lib/conexionbd');

function cargarDirectores(req, res) {
    var sql = "SELECT * FROM director";
    con.query(sql, (error, resultado, campos) => {
        if (error) {
            console.log("Hay un error en la consulta de Directores", error.message);
            return res.status(404).send("No se pueden obtener los Directores");
        }

        res.send(JSON.stringify(resultado));

    })
}

module.exports = {
    cargarDirectores: cargarDirectores,
}