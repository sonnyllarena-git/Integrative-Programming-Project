// ==============================
// IMPORTS
// ==============================

const db = require("./database");

const {
  validateStudentInput
} = require("./validation");


// ==============================
// CREATE STUDENT
// ==============================

function createStudent(name, program) {
  const errors = validateStudentInput(
    name,
    program
  );

  if (errors.length > 0) {
    throw new Error(errors[0]);
  }

  const result = db.prepare(`
    INSERT INTO Student (name, program)
    VALUES (?, ?)
  `).run(
    name.trim(),
    program.trim()
  );

  return {
    id: result.lastInsertRowid,
    name: name.trim(),
    program: program.trim()
  };
}


// ==============================
// GET ONE STUDENT
// ==============================

function getStudent(id) {
  return db.prepare(`
    SELECT *
    FROM Student
    WHERE id = ?
  `).get(id);
}


// ==============================
// GET ALL STUDENTS
// ==============================

function getAllStudents() {
  return db.prepare(`
    SELECT *
    FROM Student
    ORDER BY id ASC
  `).all();
}


// ==============================
// UPDATE STUDENT
// ==============================

function updateStudent(id, name, program) {
  const errors = validateStudentInput(
    name,
    program
  );

  if (errors.length > 0) {
    throw new Error(errors[0]);
  }

  const result = db.prepare(`
    UPDATE Student
    SET name = ?, program = ?
    WHERE id = ?
  `).run(
    name.trim(),
    program.trim(),
    id
  );

  if (result.changes === 0) {
    return null;
  }

  return getStudent(id);
}


// ==============================
// DELETE STUDENT
// ==============================

function deleteStudent(id) {
  const result = db.prepare(`
    DELETE FROM Student
    WHERE id = ?
  `).run(id);

  return result.changes > 0;
}


// ==============================
// EXPORT STUDENT SERVICE
// ==============================

module.exports = {
  createStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent
};