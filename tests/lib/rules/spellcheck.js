// tests/lib/rules/spellcheck.js

/**
 * @fileoverview test
 * @author loplat
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/spellcheck');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const dictionary = {
  메세지: '메시지',
  Loplat: 'loplat',
  'loplat x': 'loplat X',
  'loplat I': 'loplat i',
};

const ruleTester = new RuleTester();
ruleTester.run('spellcheck', rule, {
  valid: Object.values(dictionary).map((correct) => ({
    code: `console.log('${correct}')`,
  })),
  invalid: Object.entries(dictionary).map(([wrong, correct]) => ({
    code: `console.log('${wrong}')`,
    output: `console.log('${correct}')`,
    errors: [{ message: `'${correct}'가 맞는 표현입니다.`, type: 'Literal' }],
  })),
});
