var con = require('../lib/conexionbd');

// Permite el borrado lógico de una competencia activa.

function eliminarCompetencia(req, res) {

    var idCompetencia = req.params.idCompetencia;

    sql = "UPDATE competencias SET activa = 'N' WHERE id = '" + idCompetencia + "' ";

    con.query(sql, (error, resultado, campos) => {

        if (error) {
            console.log("La competencia no se pudo eliminar", error.message);
            return res.status(404).send("La competencia no se pudo eliminar");
        }

        res.send(JSON.stringify(resultado));
    })

}

module.exports = {
    eliminarCompetencia: eliminarCompetencia,
}