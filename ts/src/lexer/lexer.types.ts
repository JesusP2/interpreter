import { TokenPool } from '@/token';

type Eq<A, B extends A> = 'passes';
type Lexer<
  I extends TokenPool[keyof TokenPool][],
  Acc extends unknown[] = []
> = I extends [infer P, ...infer Args]
  ? Args extends TokenPool[keyof TokenPool][]
  ? P extends TokenPool[keyof TokenPool]
  ? Lexer<Args, [...Acc, CharToToken<P>]>
  : never
  : never
  : Acc;

type CharToToken<Char extends TokenPool[keyof TokenPool]> = Char extends '='
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
  : { Type: 'EOF'; Literal: '' };

type test_1 = [
  Eq<
    Lexer<['=', '+', '(', ')', '{', '}', ',', ';']>,
    [
      { Type: 'ASSIGN'; Literal: '=' },
      { Type: 'PLUS'; Literal: '+' },
      { Type: 'LPAREN'; Literal: '(' },
      { Type: 'RPAREN'; Literal: ')' },
      { Type: 'LBRACE'; Literal: '{' },
      { Type: 'RBRACE'; Literal: '}' },
      { Type: 'COMMA'; Literal: ',' },
      { Type: 'SEMICOLON'; Literal: ';' }
    ]
  >
];

// Expected to fail
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
