
DELIMITER $$
CREATE  PROCEDURE `i_user`(
	IN nickname varchar(50),
    IN mail varchar(60),
    IN pass varchar (100)
)
BEGIN
	INSERT INTO users (Nickname, Email, Pass, Active)
	VALUES (nickname,mail,pass,1);
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `u_user_data`(
	IN idu int,
	IN nickname varchar(50),
    IN mail varchar(60)
)
BEGIN
	UPDATE users 
    SET Nickname = nickname, Email = mail
    WHERE id = idu;
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `u_user_pass`(
	IN idu int,
	IN pass varchar (100)
)
BEGIN
	UPDATE users 
    SET Pass = pass
    WHERE id = idu;
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `s_user`(
    IN mail varchar(60),
    IN pass varchar (100)
)
BEGIN
	SELECT id,Nickname, Email, Pass 
    FROM users
    WHERE Email = mail AND Pass = pass;
    
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `i_score`(
	IN score bigint,
    IN user int,
    IN song int
)
BEGIN
	INSERT INTO score (idUSer,idSong,Score)
	VALUES (user,song,score);
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `u_score`(
	IN score bigint,
    IN user int,
    IN song int
)
BEGIN
	UPDATE score
    SET Score = score
    WHERE idUser = user AND idSong = song;
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `s_score`(
	IN idS INT 
)
BEGIN
	SELECT U.Nickname, S.score
    FROM score S
    INNER JOIN users U
    ON U.id = S.idUser
    
    WHERE S.idSong = idS;
    
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `s_songs`(
)
BEGIN
	SELECT id, Namesong
    FROM songs;
    
	END$$
DELIMITER ;

