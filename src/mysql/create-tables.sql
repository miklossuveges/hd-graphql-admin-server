DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	email_address VARCHAR(150) NOT NULL,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	num_legs INT DEFAULT 2,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ( id )
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  body TEXT NOT NULL,
  post_id INT NOT NULL,
  author_id INT NOT NULL,
  archived BIT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ( id )
);

-- DROP TABLE IF EXISTS posts;
-- CREATE TABLE posts (
--   id INT PRIMARY KEY AUTOINCREMENT,
--   body TEXT NOT NULL,
--   author_id INT NOT NULL,
--   archived BOOLEAN DEFAULT 0,
--   created_at DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY ( id )
-- );

-- DROP TABLE IF EXISTS relationships;
-- CREATE TABLE relationships (
--   follower_id INT NOT NULL,
--   followee_id INT NOT NULL,
--   closeness VARCHAR(255),
--   created_at DEFAULT CURRENT_TIMESTAMP,
--   UNIQUE (follower_id, followee_id) ON CONFLICT REPLACE
-- );

-- DROP TABLE IF EXISTS likes;
-- CREATE TABLE likes (
--   account_id INT NOT NULL,
--   comment_id INT NOT NULL,
--   created_at DEFAULT CURRENT_TIMESTAMP,
--   UNIQUE (account_id, comment_id) ON CONFLICT REPLACE
-- );

-- DROP TABLE IF EXISTS sponsors;
-- CREATE TABLE sponsors (
--   generation INT NOT NULL,
--   first_name VARCHAR(255),
--   last_name VARCHAR(255),
--   num_legs INT DEFAULT 2,
--   created_at DEFAULT CURRENT_TIMESTAMP
-- );

COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
