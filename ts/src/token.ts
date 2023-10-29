export type TokenPool = {
  ILLEGAL: string;
  EOF: '';
  IDENT: string;
  INT: string;
  ASSIGN: '=';
  PLUS: '+';
  COMMA: ',';
  SEMICOLON: ';';
  LPAREN: '(';
  RPAREN: ')';
  LBRACE: '{';
  RBRACE: '}';
  FUNCTION: 'fn';
  LET: 'let';
};

export type TokenType = keyof TokenPool;

export type Token = {
  [K in keyof TokenPool]: {
    Type: K;
    Literal: TokenPool[K];
  };
}[keyof TokenPool];

export type LookUpIntent = Pick<TokenPool, 'FUNCTION' | 'LET'>

export const keywords = {
  'fn': 'FUNCTION',
  'let': 'LET'
} as const;

export function lookUpIdent(ident: string) {
  if (ident in keywords) {
    return 
  }
}
