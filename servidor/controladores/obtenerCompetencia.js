var con = require('../lib/conexionbd');

/* Obtiene los datos nombre de la competencia, genero, director, actor;
cuando se carga la página, para luego utilizar al editar, reiniciar o eliminar
una competencia desde el administrador.
*/

function obtenerCompetencia(req, res) {

    var id = req.params.id;
    var activa = "Y";

    var sql = "SELECT * FROM competencias  WHERE id = '" + id + "'";

    con.query(sql, (error, resultado, campos) => {

        if (error) {
            console.log("La competencia no se pudo obtener", error.message);
            return res.status(404).send("La competencia no se pudo obtener");
        }

        // Guardamos en variales los resultados obtenidos en la consulta a la BD.
        var genero_id = resultado[0].genero_id;
        var actor_id = resultado[0].actor_id;
        var director_id = resultado[0].director_id;

        var sqlObtenerData = "SELECT ";

        if (genero_id) {
            sqlObtenerData += " genero.nombre as nombreGenero, ";
        }

        if (actor_id) {
            sqlObtenerData += " actor.nombre as nombreActor, ";
        }

        if (director_id) {
            sqlObtenerData += " director.nombre as nombreDirector, ";
        }

        sqlObtenerData += " competencias.nombre as nombreCompetencia FROM competencias ";

        if (genero_id) {
            sqlObtenerData += " JOIN genero ON competencias.genero_id= genero.id ";
        }

        if (actor_id) {
            sqlObtenerData += " JOIN actor ON competencias.actor_id = actor.id ";
        }

        if (director_id) {
            sqlObtenerData += " JOIN director ON competencias.director_id = director.id ";
        }

        sqlObtenerData += " WHERE competencias.id = " + id + " AND activa = '" + activa + "' GROUP BY competencias.nombre ";

        con.query(sqlObtenerData, (error, resultadoObtenerData, campos) => {

            if (error) {

                console.log("Existe un error", error.message);
                return res.status(404).send("La competencia no existe o no está Activa");

            }

            var response = {

                'nombre': resultadoObtenerData[0].nombreCompetencia,
                'genero_nombre': resultadoObtenerData[0].nombreGenero,
                'actor_nombre': resultadoObtenerData[0].nombreActor,
                'director_nombre': resultadoObtenerData[0].nombreDirector
            }

            res.send(JSON.stringify(response));

        })
    })
}

module.exports = {
    obtenerCompetencia: obtenerCompetencia,
}