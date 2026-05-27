const { RuleTester } = require("eslint");
const rule = require("./rules/no-blasphemy.js");

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `const` variables were introduced.
  languageOptions: { ecmaVersion: 2015 }
});

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  "no-blasphemy", // rule name
  rule, // rule code
  { // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: "const foo = 'bar';",
      },
      {
        code: "console.log('m4donn');",
      },
      {
        code: "const foo = 'odio';",
      },
      {
        code: "const foo = 'audio';",
      },
      {
        code: "const foo = 'radiografia';",
      }
    ],
    // 'invalid' checks cases that should not pass
    invalid: [{
      code: "const foo = 'd1o';",
      errors: [{ message: "Blasphemy is not allowed." }],
    },
    {
      code: "console.log('m4donna');",
      errors: [{ message: "Blasphemy is not allowed." }],
    },
    {
      code: "const foo = 'gèsù';",
      errors: [{ message: "Blasphemy is not allowed." }],
    },
    {
      code: "const foo = 'cr1st0';",
      errors: [{ message: "Blasphemy is not allowed." }],
    },
    {
      code: "const foo = 'd.i.o';",
      errors: [{ message: "Blasphemy is not allowed." }],
    },
    {
      code: "const foo = 'm a d o n n a';",
      errors: [{ message: "Blasphemy is not allowed." }],
    }
    ],
  }
);

console.log("All tests passed!");