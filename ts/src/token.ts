export const tokenPool = {
  ILLEGAL: 'ILLEGAL',
  EOF: 'EOF',
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

export type TokenType = keyof typeof tokenPool;

export type Token<K extends TokenType> = {
  Type: K;
  Literal: TokenPool[K];
};
