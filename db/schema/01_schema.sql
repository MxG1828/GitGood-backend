DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS repositories CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TABLE repositories(
  id INTEGER PRIMARY KEY NOT NULL ,
  repoowner VARCHAR(255) NOT NULL,
  reponame VARCHAR(255) NOT NULL,
  repolanguage VARCHAR(255) NOT NULL,
  repodescription VARCHAR(255),
  gitAvatar VARCHAR(255) NOT NULL
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  repository_id INTEGER REFERENCES repositories(id) ON DELETE CASCADE
);
