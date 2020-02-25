var con = require('../lib/conexionbd');

function votarPeli(req, res) {

    //Se guardar en variables los datos recibimos por parametro y en el body desde el front.
    var idCompetencia = req.params.idCompetencia;
    var idPelicula = req.body.idPelicula;

    var sql = "INSERT INTO votos set competencia_id = " + idCompetencia + ", pelicula_id = " + idPelicula + ", activa='Y'";

    con.query(sql, (error, resultado, campos) => {

        if (error) {
            console.log("No se pudo sumar voto", error.message);
            return res.status(404).send("Existe un error, tu voto no pudo ser contabilizado");
        }

        res.send(JSON.stringify(resultado));

    })
}

module.exports = {
    votarPeli: votarPeli,
}