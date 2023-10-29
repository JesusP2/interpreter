type TokenPool = {
  ILLEGAL: 'ILLEGAL';
  EOF: 'EOF';
  IDENT: 'IDENT';
  INT: 'INT';
  ASSIGN: '=';
  PLUS: '+';
  COMMA: ',';
  SEMICOLON: ';';
  LPAREN: '(';
  RPAREN: ')';
  LBRACE: '{';
  RBRACE: '}';
  FUNCTION: 'FUNCTION';
  LET: 'LET';
};

type TokenType = keyof TokenPool;

type Token<K extends TokenType> = {
  Type: K;
  Literal: TokenPool[K];
};
