INSERT INTO hd.accounts ( id, email_address ) VALUES ( 42, 'm@masd' );
INSERT INTO hd.accounts ( id, email_address ) VALUES ( 242, 'd1@23sd' );
INSERT INTO hd.accounts ( id, email_address ) VALUES ( 1024, 'ko@42.et' );

INSERT INTO hd.posts ( id, body, author_id ) VALUES ( 1, 'post1', 42 );
INSERT INTO hd.posts ( id, body, author_id ) VALUES ( 2, 'post2', 42 );
INSERT INTO hd.posts ( id, body, author_id ) VALUES ( 3, 'post3', 42 );
INSERT INTO hd.posts ( id, body, author_id ) VALUES ( 4, 'post4', 42 );
INSERT INTO hd.posts ( id, body, author_id ) VALUES ( 100, 'asdasde', 242 );
INSERT INTO hd.posts ( id, body, author_id ) VALUES ( 101, '123asdasde', 242 );

INSERT INTO hd.comments ( body, post_id, author_id ) values ('best', 1, 1024);
INSERT INTO hd.comments ( body, post_id, author_id ) values ('indeed', 1, 242);
INSERT INTO hd.comments ( body, post_id, author_id ) values ('ok', 1, 42);
INSERT INTO hd.comments ( body, post_id, author_id ) values ('worst', 2, 1024);
