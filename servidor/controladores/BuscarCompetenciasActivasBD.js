var con = require('../lib/conexionbd');

//Trae de la BD todas las competencias activas (tabla competencias, campo activa="Y").

function buscarCompetenciasActivasBD(req, res) {

    var sql = "SELECT * FROM competencias where activa = 'Y'";

    con.query(sql, (error, resultado, campos) => {

        if (error) {
            console.log("Existe un error", error.message);
            return res.status(404).send("Existe un error en la consulta");
        }

        res.send(JSON.stringify(resultado));

    })
}

module.exports = {
    buscarCompetenciasActivasBD: buscarCompetenciasActivasBD,
}