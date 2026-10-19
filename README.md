# Student Records Management System

A simple integrated information system built for CCIT102 - Integrative Programming 1.

This project demonstrates the integration of:

- JavaScript and Node.js
- Modular application design
- SQLite database
- REST API
- Centralized validation
- Authentication
- Protected endpoints
- Unit testing
- Integration testing
- Git version control

---

## Project Overview

The Student Records Management System manages student records using a layered application structure.

The system contains three related database entities:

- Student
- Course
- Enrollment

The `Enrollment` table connects students and courses.

---

## Application Architecture

The project uses a layered structure:

```text
Client
  |
  v
REST API
  |
  v
Student Service
  |
  +--> Validation
  |
  v
Database Layer
  |
  v
SQLite Database