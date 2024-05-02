// lib/rules/spellcheck.js

/**
 * @fileoverview test
 * @author loplat
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here
    const dictionary = {
      메세지: '메시지',
      Loplat: 'loplat',
      'loplat x': 'loplat X',
      'loplat I': 'loplat i',
    };

    return {
      // visitor functions for different types of nodes
      Literal(node) { // Literal type 일때
        const text = node.raw;

        Object.entries(dictionary).forEach(([wrong, correct]) => {
          if (text.includes(wrong)) { // 오타가 있으면
            context.report({
              node,
              message: "'{{ correct }}'가 맞는 표현입니다.",
              data: { correct },
              fix: (fixer) => fixer.replaceText(node, text.replace(wrong, correct)), // 올바른 표현으로 교정
            });
          }
        });
      },
    };
  },
};
