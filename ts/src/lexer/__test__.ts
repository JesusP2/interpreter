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

  test('test numba 3', () => {
    const input = `let five = 5;
let ten = 10;

let add = fn(x, y) {
  x + y;
};

let result = add(five, ten);
`;

    const tests: Token[] = [
      { Type: 'LET', Literal: 'let' },
      { Type: 'IDENT', Literal: 'five' },
      { Type: 'ASSIGN', Literal: '=' },
      { Type: 'INT', Literal: '5' },
      { Type: 'SEMICOLON', Literal: ';' },
      { Type: 'LET', Literal: 'let' },
      { Type: 'IDENT', Literal: 'ten' },
      { Type: 'ASSIGN', Literal: '=' },
      { Type: 'INT', Literal: '10' },
      { Type: 'SEMICOLON', Literal: ';' },
      { Type: 'LET', Literal: 'let' },
      { Type: 'IDENT', Literal: 'add' },
      { Type: 'ASSIGN', Literal: '=' },
      { Type: 'FUNCTION', Literal: 'fn' },
      { Type: 'LPAREN', Literal: '(' },
      { Type: 'IDENT', Literal: 'x' },
      { Type: 'COMMA', Literal: ',' },
      { Type: 'IDENT', Literal: 'y' },
      { Type: 'RPAREN', Literal: ')' },
      { Type: 'LBRACE', Literal: '{' },
      { Type: 'IDENT', Literal: 'x' },
      { Type: 'PLUS', Literal: '+' },
      { Type: 'IDENT', Literal: 'y' },
      { Type: 'SEMICOLON', Literal: ';' },
      { Type: 'RBRACE', Literal: '}' },
      { Type: 'SEMICOLON', Literal: ';' },
      { Type: 'LET', Literal: 'let' },
      { Type: 'IDENT', Literal: 'result' },
      { Type: 'ASSIGN', Literal: '=' },
      { Type: 'IDENT', Literal: 'add' },
      { Type: 'LPAREN', Literal: '(' },
      { Type: 'IDENT', Literal: 'five' },
      { Type: 'COMMA', Literal: ',' },
      { Type: 'IDENT', Literal: 'ten' },
      { Type: 'RPAREN', Literal: ')' },
      { Type: 'SEMICOLON', Literal: ';' },
      { Type: 'EOF', Literal: '' },
    ];

    const l = new Lexer(input);
    tests.forEach((test) => {
      const token = l.nextToken();
      assert.deepEqual(token.Type, test.Type);
      assert.deepEqual(token.Literal, test.Literal);
    });
  });
});
