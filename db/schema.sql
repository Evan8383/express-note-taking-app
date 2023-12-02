CREATE DATABASE notes_db;

USE notes_db;

CREATE TABLE notes (
  noteID INT NOT NULL AUTO_INCREMENT,
  noteTitle TEXT NOT NULL,
  noteText TEXT NOT NULL,
  PRIMARY KEY (noteID)
);