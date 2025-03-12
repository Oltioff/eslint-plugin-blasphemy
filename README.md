# eslint-plugin-blasphemy

A custom ESLint plugin to enforce code cleanliness by disallowing certain words or phrases.

## Installation

To install the plugin, run:

```sh
npm install --save-dev eslint-plugin-blasphemy
```

## Configuration

Modify your `.eslintrc.js`:

```js
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["blasphemy", "prettier"],
  rules: {
    "blasphemy/nope": "error", // Enable the rule
    "prettier/prettier": "error"
  },
  ignorePatterns: ["/dist/*"]
};
```

**Important:** The plugin name should be referenced without the `eslint-plugin-` prefix.

## The `nope` Rule

### Important: the rule prevent only italian words
The `nope` rule prevents the use of certain forbidden words in your code. It will trigger an error when any blacklisted word is found in string literals.

#### Example (Invalid Code):
```js
const message = "d1o or m4dònna or cr1st0"; // ❌ This will trigger an ESLint error
```

#### Example (Valid Code):
```js
const message = "This is a clean message"; // ✅ No error
```

## License

MIT License. Created with ❤️ by Oltion Abazi

