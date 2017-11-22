-- create database gipi;
-- use gipi;    


CREATE TABLE `songs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Namesong` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Nickname` varchar(50) NOT NULL,
  `Email` varchar(60) DEFAULT NULL,
  `Pass` varchar(255) DEFAULT NULL,
  `Active` int(3) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `score` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idUser` int(10) unsigned NOT NULL,
  `idSong` int(10) unsigned NOT NULL,
  `Score` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `score_idfk_user` (`idUser`),
  KEY `score_idfk_song` (`idSong`),
  CONSTRAINT `score_idfk_song` FOREIGN KEY (`idSong`) REFERENCES `songs` (`id`),
  CONSTRAINT `score_idfk_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


