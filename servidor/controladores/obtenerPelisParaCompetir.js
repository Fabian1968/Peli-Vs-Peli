var con = require('../lib/conexionbd');

// Se inicializan variables globales.
var genero_id;
var actor_id;
var director_id;
var nombre;



function obtenerPelisParaCompetir(req, res) {


    var id = req.params.id; // id de la competencia que se recibe x parámetro.
    var activa = "Y"; // Ref. al campo de la tabla que indica que la competencia está activa.

    var sqlCompetencia = "SELECT * FROM competencias WHERE id = " + id + " AND activa = '" + activa + "'";

    con.query(sqlCompetencia, (error, resultadoCompetencia, campos) => {

        if (error) {
            console.log("Existe un error", error.message);
            return res.status(404).send("La competencia no existe o no está Activa");
        }
        //Se guardan en variables los resultados de la competencia obtenidos de la consulta a la BD.
        genero_id = resultadoCompetencia[0].genero_id;
        director_id = resultadoCompetencia[0].director_id;
        actor_id = resultadoCompetencia[0].actor_id;
        nombre = resultadoCompetencia[0].nombre;

        var sql = "SELECT pelicula.id, pelicula.titulo, pelicula.poster FROM pelicula JOIN director ON pelicula.director = director.nombre JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id WHERE 1=1";

        if (actor_id) {

            sql += ' AND actor_pelicula.actor_id = "' + actor_id + '"';

        }

        if (genero_id) {

            sql += ' AND pelicula.genero_id = "' + genero_id + '"';

        }

        if (director_id) {

            sql += ' AND director.id = "' + director_id + '"';

        }

        sql += ' AND 2=2  GROUP BY titulo ORDER BY RAND() LIMIT 2';

        con.query(sql, (error, resultado, campos) => {

            if (error) {
                console.log("Existe un error", error.message);
                return res.status(404).send("Existe un error en la consulta");
            }

            var response = {
                'peliculas': resultado,
                'competencia': nombre
            }

            res.send(JSON.stringify(response));

        })
    })
}

module.exports = {
    obtenerPelisParaCompetir: obtenerPelisParaCompetir,
}