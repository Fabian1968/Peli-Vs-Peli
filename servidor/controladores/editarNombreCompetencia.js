var con = require('../lib/conexionbd');

function editarNombre(req, res) {

    var idCompetencia = req.params.idCompetencia;
    var nombre = req.body.nombre;

    var sql = "UPDATE competencias SET nombre = '" + nombre + "' WHERE id = '" + idCompetencia + "'";

    con.query(sql, (error, resultado, campos) => {

        if (error) {
            console.log("No se pudo cambiar el nombre", error.message);
            return res.status(404).send("No se pudo cambiar el nombre");
        }

        res.send(JSON.stringify(resultado));

    })
}

module.exports = {
    editarNombre: editarNombre,
}