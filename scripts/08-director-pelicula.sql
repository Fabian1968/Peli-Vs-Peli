DROP TABLE IF EXISTS `director_pelicula`;

CREATE TABLE `director_pelicula` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `director_id` int(11) unsigned NOT NULL,
  `pelicula_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `director_id` (`director_id`),
  KEY `pelicula_director_id` (`pelicula_id`),
  CONSTRAINT `director_id` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`),
  CONSTRAINT `pelicula_director_id` FOREIGN KEY (`pelicula_id`) REFERENCES `pelicula` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1024 DEFAULT CHARSET=latin1