DROP TABLE IF EXISTS `competencias`;

CREATE TABLE `competencias` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(70) NOT NULL,
  `activa` varchar(10) DEFAULT 'Y',
  `genero_id` int(11) unsigned DEFAULT NULL,
  `actor_id` int(11) unsigned DEFAULT NULL,
  `director_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_unico` (`nombre`),
  KEY `competencias_genero` (`genero_id`),
  KEY `competencias_actor` (`actor_id`),
  KEY `competencias_director` (`director_id`),
  CONSTRAINT `competencias_actor` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`),
  CONSTRAINT `competencias_director` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`),
  CONSTRAINT `competencias_genero` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=265 DEFAULT CHARSET=latin1
