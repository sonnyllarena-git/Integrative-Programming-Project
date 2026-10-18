// ==============================
// DATABASE SETUP
// ==============================

const Database = require("better-sqlite3");

const db = new Database("school.db");

db.pragma("foreign_keys = ON");


// ==============================
// CREATE TABLES
// ==============================

db.exec(`
  CREATE TABLE IF NOT EXISTS Student (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    program TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Course (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Enrollment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade REAL,
    FOREIGN KEY (student_id) REFERENCES Student(id),
    FOREIGN KEY (course_id) REFERENCES Course(id)
  );
`);


// ==============================
// EXPORT DATABASE
// ==============================

module.exports = db;