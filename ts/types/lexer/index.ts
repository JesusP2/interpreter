import { TokenPool } from '@/token';
import { ABC, Abc, type Eq } from '../utils'

// type Lexer<
//   I extends TokenPool[keyof TokenPool][],
//   Acc extends unknown[] = []
// > = I extends [infer Char, ...infer Rest]
//   ? Rest extends TokenPool[keyof TokenPool][]
//   ? Char extends TokenPool[keyof TokenPool]
//   ? Lexer<Rest, [...Acc, CharToToken<Char>]>
//   : never
//   : never
//   : Acc;

type Lexer<
  I extends TokenPool[keyof TokenPool][],
  Acc extends unknown[] = []
> = I extends [infer Char, ...infer Rest]
  ? Char extends ' ' | '\t' | '\n' | '\r'
  ? Rest extends TokenPool[keyof TokenPool][]
  ? Char extends TokenPool[keyof TokenPool]
  ? Lexer<Rest, Acc>
  : Lexer<Rest, [...Acc, CharToToken<Char>]>
  : never
  : never
  : Acc;

  // ? Rest extends TokenPool[keyof TokenPool][]
  // ? Char extends TokenPool[keyof TokenPool]
  // ? Lexer<Rest, [...Acc, CharToToken<Char>]>
  // : never
  // : never
  // : Acc;


// ? = then
// : = else

type CharToToken<Char extends TokenPool[keyof TokenPool]> = 
  Char extends '='
  ? { Type: 'ASSIGN'; Literal: '=' }
  : Char extends ';'
  ? { Type: 'SEMICOLON'; Literal: ';' }
  : Char extends '('
  ? { Type: 'LPAREN'; Literal: '(' }
  : Char extends ')'
  ? { Type: 'RPAREN'; Literal: ')' }
  : Char extends ','
  ? { Type: 'COMMA'; Literal: ',' }
  : Char extends '+'
  ? { Type: 'PLUS'; Literal: '+' }
  : Char extends '{'
  ? { Type: 'LBRACE'; Literal: '{' }
  : Char extends '}'
  ? { Type: 'RBRACE'; Literal: '}' }
  : Char extends ''
  ? { Type: 'EOF'; Literal: '' }
: Char extends Abc | ABC
? 


type test_1 = [
  Eq<
    Lexer<['=', '+', '(', ')', '{', '}', ',', ';', '']>,
    [
      { Type: 'ASSIGN'; Literal: '=' },
      { Type: 'PLUS'; Literal: '+' },
      { Type: 'LPAREN'; Literal: '(' },
      { Type: 'RPAREN'; Literal: ')' },
      { Type: 'LBRACE'; Literal: '{' },
      { Type: 'RBRACE'; Literal: '}' },
      { Type: 'COMMA'; Literal: ',' },
      { Type: 'SEMICOLON'; Literal: ';' },
      { Type: 'EOF'; Literal: '' }
    ]
  >
];

// NOTE: Expected to fail btw (btw)
type test_2 = [
  Eq<
    Lexer<['=', '+', '+', '(', ')', '{', '(', '}', ')', ',', ';']>,
    [
      { Type: 'ASSIGN', Literal: '=' },
      { Type: 'SEMICOLON', Literal: ';' }, // { Type: 'PLUS', Literal: '+' },
      { Type: 'PLUS', Literal: '+' },
      { Type: 'LPAREN', Literal: '(' },
      { Type: 'RPAREN', Literal: ')' },
      { Type: 'LBRACE', Literal: '{' },
      { Type: 'LPAREN', Literal: '(' },
      { Type: 'RBRACE', Literal: '}' },
      { Type: 'RPAREN', Literal: ')' },
      { Type: 'COMMA', Literal: ',' },
      { Type: 'SEMICOLON', Literal: ';' },
    ]
  >
];

type test_3 = [
  Eq<
    Lexer<['=']>,
    [
      { Type: 'ASSIGN'; Literal: '=' },
    ]
  >
];
