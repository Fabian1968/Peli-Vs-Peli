var con = require('../lib/conexionbd');

// Permite volver a iniciar una competencia, desestimando los votos recibidos anteriormente.

function reiniciarCompetencia(req, res) {
    var idCompetencia = req.params.idCompetencia;

    var sql = "UPDATE votos SET activa = 'N' where competencia_id = " + idCompetencia + "";

    con.query(sql, (error, resultado, campos) => {
        if (error) {
            console.log("No existe el identificador de competencia", error.message);
            return res.status(404).send("El identificador de competencia no existe");
        }

        res.send(JSON.stringify(resultado));

    })
}

module.exports = {
    reiniciarCompetencia: reiniciarCompetencia,
}