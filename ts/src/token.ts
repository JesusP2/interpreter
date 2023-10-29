export const tokenPool = {
  ILLEGAL: 'ILLEGAL',
  EOF: '',
  IDENT: 'IDENT',
  INT: 'INT',
  ASSIGN: '=',
  PLUS: '+',
  COMMA: ',',
  SEMICOLON: ';',
  LPAREN: '(',
  RPAREN: ')',
  LBRACE: '{',
  RBRACE: '}',
  FUNCTION: 'FUNCTION',
  LET: 'LET',
} as const;

export type TokenPool = typeof tokenPool;

export type TokenType = keyof TokenPool;

export type Token = {
  [K in keyof TokenPool]: {
    Type: K;
    Literal: TokenPool[K];
  };
}[keyof TokenPool];
