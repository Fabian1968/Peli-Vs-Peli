DROP TABLE IF EXISTS `pelicula`;

CREATE TABLE `pelicula` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(300) DEFAULT '',
  `anio` decimal(5,0) DEFAULT NULL,
  `duracion` decimal(5,0) DEFAULT NULL,
  `genero_id` int(11) unsigned DEFAULT NULL,
  `director` varchar(400) DEFAULT '',
  `fecha_lanzamiento` date DEFAULT NULL,
  `puntuacion` decimal(2,0) DEFAULT NULL,
  `poster` varchar(300) DEFAULT '',
  `trama` varchar(700) DEFAULT '',
  `genero_string` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pelicula_genero` (`genero_id`),
  CONSTRAINT `pelicula_genero` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=744 DEFAULT CHARSET=latin1