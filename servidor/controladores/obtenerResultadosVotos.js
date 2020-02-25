var con = require('../lib/conexionbd');

function obtenerResultadosVotos(req, res) {

    //Se guarda en variable el parametro recibido desde el front.
    var idCompetencia = req.params.id;

    var sqlCompetencia = "SELECT nombre FROM competencias WHERE id = " + idCompetencia + "";

    var sql = "select pelicula.id, pelicula.titulo, pelicula.poster,  COUNT(*) AS votos from votos join pelicula on votos.pelicula_id= pelicula.id where competencia_id= " + idCompetencia + " and votos.activa='Y' group by pelicula.id order by votos desc limit 3";

    con.query(sql, (error, resultado, campos) => {

        if (error) {
            console.log("error", error.message);
            return res.status(404).send("Error");
        }

        var response = {
            'resultados': resultado,
            'competencia': ""

        }

        con.query(sqlCompetencia, (error, resultadoCompetencia, campos) => {
            if (error) {
                console.log("Existe un error", error.message);
                return res.status(404).send("Existe un error en la consulta");
            }
            response.competencia = resultadoCompetencia[0].nombre;

            res.send(JSON.stringify(response));

        })
    })
}

module.exports = {
    obtenerResultadosVotos: obtenerResultadosVotos,
}