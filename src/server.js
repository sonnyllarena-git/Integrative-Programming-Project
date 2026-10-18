// ==============================
// IMPORTS
// ==============================

const http = require("http");

const {
  createStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent
} = require("./studentService");


// ==============================
// CREATE SERVER
// ==============================

const server = http.createServer((req, res) => {

  res.setHeader(
    "Content-Type",
    "application/json"
  );

  const parsedUrl = new URL(
    req.url,
    `http://${req.headers.host}`
  );


  // ==============================
  // GET ALL STUDENTS
  // ==============================

  if (
    req.method === "GET" &&
    parsedUrl.pathname === "/students"
  ) {
    const students = getAllStudents();

    res.statusCode = 200;

    return res.end(
      JSON.stringify(students)
    );
  }


  // ==============================
  // GET ONE STUDENT
  // ==============================

  if (
    req.method === "GET" &&
    parsedUrl.pathname.startsWith("/students/")
  ) {
    const id = Number(
      parsedUrl.pathname.split("/")[2]
    );

    const student = getStudent(id);

    if (!student) {
      res.statusCode = 404;

      return res.end(
        JSON.stringify({
          error: "Student not found"
        })
      );
    }

    res.statusCode = 200;

    return res.end(
      JSON.stringify(student)
    );
  }


  // ==============================
  // CREATE STUDENT
  // ==============================

  if (
    req.method === "POST" &&
    parsedUrl.pathname === "/students"
  ) {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        const student = createStudent(
          data.name,
          data.program
        );

        res.statusCode = 201;

        return res.end(
          JSON.stringify(student)
        );

      } catch (err) {
        res.statusCode = 400;

        return res.end(
          JSON.stringify({
            error: err.message
          })
        );
      }
    });

    return;
  }


  // ==============================
  // UPDATE STUDENT
  // ==============================

  if (
    req.method === "PUT" &&
    parsedUrl.pathname.startsWith("/students/")
  ) {
    const id = Number(
      parsedUrl.pathname.split("/")[2]
    );

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        const student = updateStudent(
          id,
          data.name,
          data.program
        );

        if (!student) {
          res.statusCode = 404;

          return res.end(
            JSON.stringify({
              error: "Student not found"
            })
          );
        }

        res.statusCode = 200;

        return res.end(
          JSON.stringify(student)
        );

      } catch (err) {
        res.statusCode = 400;

        return res.end(
          JSON.stringify({
            error: err.message
          })
        );
      }
    });

    return;
  }


  // ==============================
  // DELETE STUDENT
  // ==============================

  if (
    req.method === "DELETE" &&
    parsedUrl.pathname.startsWith("/students/")
  ) {
    const id = Number(
      parsedUrl.pathname.split("/")[2]
    );

    const deleted = deleteStudent(id);

    if (!deleted) {
      res.statusCode = 404;

      return res.end(
        JSON.stringify({
          error: "Student not found"
        })
      );
    }

    res.statusCode = 200;

    return res.end(
      JSON.stringify({
        message: "Student deleted successfully"
      })
    );
  }


  // ==============================
  // ROUTE NOT FOUND
  // ==============================

  res.statusCode = 404;

  return res.end(
    JSON.stringify({
      error: "Not found"
    })
  );
});


// ==============================
// START SERVER
// ==============================

server.listen(3000, () => {
  console.log(
    "API running on http://localhost:3000"
  );
});