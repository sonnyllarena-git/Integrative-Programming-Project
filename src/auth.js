// ==============================
// DEMO USER
// ==============================

const DEMO_USER = {
  username: "admin",
  password: "admin123"
};


// ==============================
// DEMO TOKEN
// ==============================

const AUTH_TOKEN =
  "student-system-token";


// ==============================
// LOGIN
// ==============================

function login(username, password) {
  if (
    username === DEMO_USER.username &&
    password === DEMO_USER.password
  ) {
    return AUTH_TOKEN;
  }

  return null;
}


// ==============================
// CHECK AUTHORIZATION HEADER
// ==============================

function isAuthenticated(req) {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return false;
  }

  return (
    authHeader ===
    `Bearer ${AUTH_TOKEN}`
  );
}


// ==============================
// EXPORT AUTH FUNCTIONS
// ==============================

module.exports = {
  login,
  isAuthenticated
};