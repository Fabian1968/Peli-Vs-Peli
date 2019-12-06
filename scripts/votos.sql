CREATE TABLE `votos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `competencia_id` int(11) unsigned NOT NULL,
  `pelicula_id` int(11) unsigned NOT NULL,
  `activa` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `competencia_id` (`competencia_id`),
  KEY `pelicula_id` (`pelicula_id`),
  CONSTRAINT `competencia_id` FOREIGN KEY (`competencia_id`) REFERENCES `competencias` (`id`),
  CONSTRAINT `pelicula_id` FOREIGN KEY (`pelicula_id`) REFERENCES `pelicula` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1