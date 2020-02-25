var con = require('../lib/conexionbd');

// Inicializamos la variable global.
var cantidadPeliculasACompetir;

function crearNuevaCompetencia(req, res) {

    //Se guardan en variables los parámetros recibidos desde el body del front.
    var nombreCompetencia = req.body.nombre;
    var actorCompetencia = req.body.actor;
    var generoCompetencia = req.body.genero;
    var directorCompetencia = req.body.director;

    var sqlContarPeliculasACompetir = "SELECT COUNT(*) as cantidad FROM pelicula ";

    if (actorCompetencia > 0) {

        sqlContarPeliculasACompetir += " JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id ";

    }

    if (directorCompetencia > 0) {

        sqlContarPeliculasACompetir += " JOIN director ON pelicula.director = director.nombre ";

    }

    sqlContarPeliculasACompetir += " WHERE 1=1 ";


    if (actorCompetencia == 0) {

        actorCompetencia = null;

    } else {

        sqlContarPeliculasACompetir += ' AND actor_pelicula.actor_id = "' + actorCompetencia + '"';

    }

    if (generoCompetencia == 0) {

        generoCompetencia = null;


    } else {

        sqlContarPeliculasACompetir += ' AND pelicula.genero_id = "' + generoCompetencia + '"';

    }

    if (directorCompetencia == 0) {

        directorCompetencia = null;


    } else {

        sqlContarPeliculasACompetir += ' AND director.id = "' + directorCompetencia + '"';

    }

    con.query(sqlContarPeliculasACompetir, (error, resultadoCantidadPeliculasACompetir, campos) => {

        cantidadPeliculasACompetir = resultadoCantidadPeliculasACompetir[0].cantidad;

        if (error) {

            console.log("Error al contar películas a competir", error.message);
            return res.status(422).send("Error al contar películas a competir");

            //Restricción adicional que impide nombre vacío.
        } else if ((nombreCompetencia.length == 0)) {

            console.log("Falta el nombre de la competencia");
            return res.status(422).send("Vuelve a intentarlo: Falta el nombre de la competencia.");

            //Restricción que impide nombre con menos de 5 caracteres.
        } else if ((nombreCompetencia.length < 5)) {

            console.log("Nombre con menos de 5 caracteres");
            return res.status(422).send("Vuelve a intentarlo: El nombre debe tener como mínimo 5 caracteres.");

            //Verifica que existan al menos 2 películas para competir.
        } else if (cantidadPeliculasACompetir < 2) {

            console.log("Menos de 2 peliculas para competir");
            return res.status(422).send("Vuelve a intentarlo: Los filtros aplicados arrojan menos de 2 Películas para competir.");

        } else {

            nombreCompetencia = '"' + req.body.nombre + '"';

            var sqlInsertarCompetencia = "INSERT INTO competencias SET nombre=  " + nombreCompetencia + " , genero_id = " + generoCompetencia + ", director_id = " + directorCompetencia + ", actor_id = " + actorCompetencia + "";

            con.query(sqlInsertarCompetencia, (error, resultadoInsertarCompetencia, campos) => {

                //Clave Unique para el campo nombre de la BD impide nombres repetidos.
                if (error) {

                    console.log("Ya existe nombre de competencia que se intenta ingresar", error.message);
                    return res.status(422).send("Vuelve a intentarlo: Ya existe el nombre de competencia " + nombreCompetencia);
                }

                res.send(JSON.stringify(resultadoInsertarCompetencia));

            })
        }
    })
}

module.exports = {
    crearNuevaCompetencia: crearNuevaCompetencia,
}