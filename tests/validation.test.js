// ==============================
// IMPORTS
// ==============================

const assert = require("assert");

const {
  validateStudentInput
} = require("../src/validation");


// ==============================
// TEST 1: VALID INPUT
// ==============================

const validResult = validateStudentInput(
  "Mateo",
  "BSIT"
);

assert.strictEqual(
  validResult.length,
  0
);


// ==============================
// TEST 2: MISSING NAME
// ==============================

const missingName = validateStudentInput(
  "",
  "BSIT"
);

assert.ok(
  missingName.length > 0
);


// ==============================
// TEST 3: MISSING PROGRAM
// ==============================

const missingProgram = validateStudentInput(
  "Mateo",
  ""
);

assert.ok(
  missingProgram.length > 0
);


// ==============================
// TEST 4: NAME TOO LONG
// ==============================

const longName = validateStudentInput(
  "A".repeat(101),
  "BSIT"
);

assert.ok(
  longName.length > 0
);


// ==============================
// TEST 5: PROGRAM TOO LONG
// ==============================

const longProgram = validateStudentInput(
  "Mateo",
  "B".repeat(51)
);

assert.ok(
  longProgram.length > 0
);


// ==============================
// TEST RESULT
// ==============================

console.log(
  "All validation unit tests passed."
);