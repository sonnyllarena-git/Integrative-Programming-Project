// ==============================
// IMPORT SERVER
// ==============================

const server = require("../src/server");


// ==============================
// TEST SETTINGS
// ==============================

const BASE_URL = "http://localhost:3000";

const AUTH_HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer student-system-token"
};


// ==============================
// TEST 1: GET ALL STUDENTS
// ==============================

async function testGetAllStudents() {
  const response = await fetch(
    `${BASE_URL}/students`
  );

  if (response.status !== 200) {
    throw new Error(
      "GET /students should return 200"
    );
  }

  console.log(
    "PASS: GET /students"
  );
}


// ==============================
// TEST 2: LOGIN
// ==============================

async function testLogin() {
  const response = await fetch(
    `${BASE_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "admin",
        password: "admin123"
      })
    }
  );

  const data = await response.json();

  if (
    response.status !== 200 ||
    !data.token
  ) {
    throw new Error(
      "Login should return 200 and a token"
    );
  }

  console.log(
    "PASS: POST /login"
  );
}


// ==============================
// TEST 3: UNAUTHORIZED CREATE
// ==============================

async function testUnauthorizedCreate() {
  const response = await fetch(
    `${BASE_URL}/students`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Unauthorized Test",
        program: "BSIT"
      })
    }
  );

  if (response.status !== 401) {
    throw new Error(
      "Unauthorized POST should return 401"
    );
  }

  console.log(
    "PASS: Unauthorized POST /students"
  );
}


// ==============================
// TEST 4: AUTHORIZED CREATE
// ==============================

async function testAuthorizedCreate() {
  const response = await fetch(
    `${BASE_URL}/students`,
    {
      method: "POST",
      headers: AUTH_HEADERS,
      body: JSON.stringify({
        name: "Integration Test",
        program: "BSIT"
      })
    }
  );

  const data = await response.json();

  if (
    response.status !== 201 ||
    !data.id
  ) {
    throw new Error(
      "Authorized POST should return 201"
    );
  }

  console.log(
    "PASS: Authorized POST /students"
  );

  return data.id;
}


// ==============================
// TEST 5: DELETE TEST STUDENT
// ==============================

async function testDeleteStudent(id) {
  const response = await fetch(
    `${BASE_URL}/students/${id}`,
    {
      method: "DELETE",
      headers: {
        "Authorization":
          "Bearer student-system-token"
      }
    }
  );

  if (response.status !== 200) {
    throw new Error(
      "DELETE should return 200"
    );
  }

  console.log(
    "PASS: DELETE /students/:id"
  );
}


// ==============================
// RUN INTEGRATION TESTS
// ==============================

async function runTests() {
  try {
    await testGetAllStudents();
    await testLogin();
    await testUnauthorizedCreate();

    const studentId =
      await testAuthorizedCreate();

    await testDeleteStudent(studentId);

    console.log(
      "\nAll API integration tests passed."
    );

  } catch (err) {
    console.error(
      "\nTEST FAILED:",
      err.message
    );

    process.exitCode = 1;

  } finally {
    server.close();
  }
}

runTests();