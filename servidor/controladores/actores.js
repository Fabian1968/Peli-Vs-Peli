var con = require('../lib/conexionbd');

// Para cargar Actores en el select del front.

function cargarActores(req, res) {
    var sql = "SELECT * FROM actor";
    con.query(sql, (error, resultado, campos) => {
        if (error) {
            console.log("Hay un error en la consulta de Actores", error.message);
            return res.status(404).send("No se pueden obtener los Actores");
        }

        res.send(JSON.stringify(resultado));

    })
}

module.exports = {
    cargarActores: cargarActores,
}