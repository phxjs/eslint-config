'use strict';

const { ESLint } = require('eslint');
const test = require('tape');

const overrideConfigFile = require.resolve('./eslintrc.json');
const linter = new ESLint({ overrideConfigFile });

test('api: lintText semicolon', async (t) => {
  t.plan(1);
  const [result] = await linter.lintText("console.log('hi there')\n\n");
  t.equal(result.messages[0].message, 'Missing semicolon.');
});

test('api: lintText arrow-parens', async (t) => {
  t.plan(1);
  const [result] = await linter.lintText("const fn = a => console.log(a); fn('yo');\n");
  t.equal(result.messages[0].message, 'Expected parentheses around arrow function argument.');
});

test('api: lintText named function spacing', async (t) => {
  t.plan(1);
  const [result] = await linter.lintText("namedFn(); function namedFn () { console.log('a named function'); }\n\n");
  t.equal(result.messages[0].message, 'Unexpected space before function parentheses.');
});

test('api: lintText variable function spacing', async (t) => {
  t.plan(1);
  const [result] = await linter.lintText("const arwFn = () => console.log('anon function'); arwFn ();\n");
  t.equal(result.messages[0].message, 'Unexpected whitespace between function name and paren.');
});
