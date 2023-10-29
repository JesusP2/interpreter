import type { Token } from '@/token';
import test from 'node:test';
import { Lexer } from '.';
import assert from 'node:assert/strict';

test.describe('lexer tests', () => {
  test('test numba 1', () => {
    const input = '=+(){},;';

    const tests: Token[] = [
      { Type: 'ASSIGN', Literal: '=' },
      { Type: 'PLUS', Literal: '+' },
      { Type: 'LPAREN', Literal: '(' },
      { Type: 'RPAREN', Literal: ')' },
      { Type: 'LBRACE', Literal: '{' },
      { Type: 'RBRACE', Literal: '}' },
      { Type: 'COMMA', Literal: ',' },
      { Type: 'SEMICOLON', Literal: ';' },
    ];

    const l = new Lexer(input);
    tests.forEach((test) => {
      const token = l.nextToken();
      assert.deepEqual(token.Type, test.Type);
      assert.deepEqual(token.Literal, test.Literal);
    });
  });

  test('test numba 2', () => {
    const input = '=++(){(}),;';

    const tests: Token[] = [
      { Type: 'ASSIGN', Literal: '=' },
      { Type: 'SEMICOLON', Literal: ';' },
      { Type: 'PLUS', Literal: '+' },
      { Type: 'LPAREN', Literal: '(' },
      { Type: 'RPAREN', Literal: ')' },
      { Type: 'LBRACE', Literal: '{' },
      { Type: 'LPAREN', Literal: '(' },
      { Type: 'RBRACE', Literal: '}' },
      { Type: 'RPAREN', Literal: ')' },
      { Type: 'COMMA', Literal: ',' },
      { Type: 'SEMICOLON', Literal: ';' },
    ];

    const l = new Lexer(input);
    tests.forEach((test, idx) => {
      const token = l.nextToken();
      if (idx === 1) {
        assert.notDeepEqual(token.Type, test.Type);
        assert.notDeepEqual(token.Literal, test.Literal);
      } else {
        assert.deepEqual(token.Type, test.Type);
        assert.deepEqual(token.Literal, test.Literal);
      }
    });
  });
});
