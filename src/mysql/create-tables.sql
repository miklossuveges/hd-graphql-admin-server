USE hd;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
	id INT NOT NULL AUTO_INCREMENT,
	email_address VARCHAR(150) NOT NULL,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	num_legs INT DEFAULT 2,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ( id )
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE posts (
  id INT NOT NULL AUTO_INCREMENT,
  body TEXT NOT NULL,
  author_id INT NOT NULL,
  archived BIT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ( id ),
  CONSTRAINT fk_post_author FOREIGN KEY ( author_id ) REFERENCES accounts ( id )
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE comments (
  id INT NOT NULL AUTO_INCREMENT,
  body TEXT NOT NULL,
  post_id INT NOT NULL,
  author_id INT NOT NULL,
  archived BIT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ( id ),
  CONSTRAINT fk_comment_author FOREIGN KEY ( author_id ) REFERENCES accounts ( id ),
  CONSTRAINT fk_comment_post FOREIGN KEY ( post_id ) REFERENCES posts ( id )
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
