//Paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//Guardamos en variables los requerimientos de los archivos controladores
var buscarCompetenciasActivasBD = require('./controladores/buscarCompetenciasActivasBD');
var obtenerPelisParaCompetir = require('./controladores/obtenerPelisParaCompetir');
var obtenerResultadosVotos = require('./controladores/obtenerResultadosVotos');
var votarPeli = require('./controladores/votarPeli');
var actores = require('./controladores/actores');
var directores = require('./controladores/directores');
var generos = require('./controladores/generos');
var crearNuevaCompetencia = require('./controladores/crearNuevaCompetencia');
var eliminarCompetencia = require('./controladores/eliminarCompetencia');
var reiniciarCompetencia = require('./controladores/reiniciarCompetencia');
var editarNombreCompetencia = require('./controladores/editarNombreCompetencia');
var obtenerCompetencia = require('./controladores/obtenercompetencia');


var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());



app.get('/competencias', buscarCompetenciasActivasBD.buscarCompetenciasActivasBD);

app.get('/competencias/:id', obtenerCompetencia.obtenerCompetencia);

app.post('/competencias', crearNuevaCompetencia.crearNuevaCompetencia);

app.get('/competencias/:id/peliculas', obtenerPelisParaCompetir.obtenerPelisParaCompetir);

app.get('/competencias/:id/resultados', obtenerResultadosVotos.obtenerResultadosVotos);

app.post('/competencias/:idCompetencia/voto', votarPeli.votarPeli);

app.delete('/competencias/:idCompetencia/votos', reiniciarCompetencia.reiniciarCompetencia);

app.get('/generos', generos.cargarGeneros);

app.get('/directores', directores.cargarDirectores);

app.get('/actores', actores.cargarActores);

app.delete('/competencias/:idCompetencia', eliminarCompetencia.eliminarCompetencia);

app.put('/competencias/:idCompetencia', editarNombreCompetencia.editarNombre);


//Seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function() {
    console.log("Escuchando en el port " + puerto);
});