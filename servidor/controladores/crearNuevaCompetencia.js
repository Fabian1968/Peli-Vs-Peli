var con = require('../lib/conexionbd');

var cantidadPeliculasACompetir;
var cantidadNombreRepetido;
var directorCompetenciaNombre;
var directorCompetenciaId;

function crearNuevaCompetencia(req, res) {

    var nombreCompetencia = req.body.nombre;
    var actorCompetencia = req.body.actor;
    var generoCompetencia = req.body.genero;
    var directorCompetencia = req.body.director;

    var sqlContarPeliculasACompetir = "SELECT COUNT(*) as cantidad FROM pelicula JOIN director ON pelicula.director = director.nombre JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id WHERE 1=1";

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

            console.log("Existe un error", error.message);
            return res.status(422).send("Existe un error en la consulta a la BD");

        } else if ((nombreCompetencia.length < 5)) {

            console.log("Sin nombre o nombre corto");
            return res.status(422).send("Vuelve a intentarlo: Sin nombre o nombre corto");

        } else if (cantidadPeliculasACompetir < 2) {

            console.log("Menos de 2 peliculas para competir");
            return res.status(422).send("Vuelve a intentarlo: Los filtros aplicados arrojan menos de 2 Películas para competir");

        } else {

            nombreCompetencia = '"' + req.body.nombre + '"';

            var sqlInsertarCompetencia = "INSERT INTO competencias SET nombre=  " + nombreCompetencia + " , genero_id = " + generoCompetencia + ", director_id = " + directorCompetencia + ", actor_id = " + actorCompetencia + "";

            con.query(sqlInsertarCompetencia, (error, resultadoInsertarCompetencia, campos) => {

                if (error) {

                    console.log("Existe un error al insertar la competencia en la BD", error.message);
                    return res.status(422).send("Existe un error al insertar la competencia en la BD");
                }

                res.send(JSON.stringify(resultadoInsertarCompetencia));

            })
        }
    })
}

module.exports = {
    crearNuevaCompetencia: crearNuevaCompetencia,
}

/*
function crearNuevaCompetencia(req, res) {

    var sqlContarPeliculasACompetir = "SELECT COUNT(*) as cantidad FROM pelicula WHERE 1=1";

    var nombreCompetencia = req.body.nombre;
    var actorCompetencia = req.body.actor;
    var generoCompetencia = req.body.genero;
    var directorCompetencia = req.body.director;

    if (nombreCompetencia.length > 0) {

        nombreCompetencia = null;

    } else {

        nombreCompetencia = '"' + req.body.nombre + '"';

        var sqlVerificarNombreRepetido = "SELECT *, count(*) as cantidad from competencias where nombre = " + nombreCompetencia + "";

        con.query(sqlVerificarNombreRepetido, (error, resultadoNombreRepetido, campos) => {

            cantidadNombreRepetido = resultadoNombreRepetido[0].cantidad;
            console.log("cantidad nombres repetidos: " + cantidadNombreRepetido);
            console.log("nombre de la competencia: " + nombreCompetencia);
            //return;


        })
    }


    // var sqlContarPeliculasACompetir = "SELECT COUNT(*) as cantidad FROM pelicula WHERE 1=1";


    if (actorCompetencia == 0) {

        actorCompetencia = null;

    } else {

        sqlContarPeliculasACompetir = 'SELECT COUNT(*) as cantidad FROM pelicula JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id WHERE actor_pelicula.actor_id = "' + actorCompetencia + '"';

    }

    if (generoCompetencia == 0) {
        generoCompetencia = null;

    } else {

        sqlContarPeliculasACompetir += ' AND genero_id = "' + generoCompetencia + '"';

    }

    if (directorCompetencia == 0) {
        directorCompetencia = null;

    } else {

        var sqlNombreDirector = 'SELECT * FROM director WHERE director.id = ' + directorCompetencia + '';

        con.query(sqlNombreDirector, (error, resultadosDirector, campos) => {

            if (error) {
                console.log("Existe un error", error.message);
                return res.status(404).send("Existe un error en la consulta");
            } else {

                directorCompetenciaNombre = resultadosDirector[0].nombre;
                directorCompetenciaId = resultadosDirector[0].id;
                console.log("nombre dir " + directorCompetenciaNombre);
                console.log("id dir " + directorCompetenciaId);

                return;
            }


        })

        sqlContarPeliculasACompetir += ' AND director = "' + directorCompetenciaNombre + '"';
    }

    console.log("sqlContarPeliculasACompetir: " + sqlContarPeliculasACompetir);

    con.query(sqlContarPeliculasACompetir, (error, resultadoCantidadPeliculasACompetir, campos) => {

        if (error) {

            console.log("Existe un error", error.message);
            return res.status(404).send("Existe un error en la consulta");

        }

        return cantidad = resultadoCantidadPeliculasACompetir[0].cantidad;


    })

    if (cantidad > 2 && cantidadNombreRepetido < 1) {
        console.log("cantidad de pelis a competir" + cantidad)

        var sqlInsertarCompetencia = "INSERT INTO competencias SET nombre=  " + nombreCompetencia + " , genero_id = " + generoCompetencia + ", director_id = " + directorCompetencia + ", actor_id = " + actorCompetencia + "";

    }

    con.query(sqlInsertarCompetencia, (error, resultado, campos) => {



        if (error) {

            console.log("Verifica la competencia a crear", error.message)
            return res.status(422).send("Vuelve a intentarlo: Te falta NOMBRE o ya existe la competencia con el NOMBRE ingresado.");

        } else if (cantidad < 2) {

            console.log("Imposible crear competencia, menos de 2 películas para competir.");
            return res.status(422).send("Vuelve a intentarlo: Los filtros que aplicaste arrojan menos de 2 peliculas para competir.");

        }

        res.send(JSON.stringify(resultado));
    })
}
*/