import { Token, keywords } from '@/token';

export class Lexer {
  input: string;
  position = 0;
  readPosition = 0;
  ch: number | string = 0;
  constructor(input: string) {
    this.input = input;
    this.readChar();
  }

  private readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = 0;
    } else {
      this.ch = this.input[this.readPosition] as string;
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  nextToken() {
    let token: Token;
    this.skipWhitespace();
    switch (this.ch) {
      case '=':
        token = { Type: 'ASSIGN', Literal: '=' };
        break;
      case ';':
        token = { Type: 'SEMICOLON', Literal: ';' };
        break;
      case '(':
        token = { Type: 'LPAREN', Literal: '(' };
        break;
      case ')':
        token = { Type: 'RPAREN', Literal: ')' };
        break;
      case ',':
        token = { Type: 'COMMA', Literal: ',' };
        break;
      case '+':
        token = { Type: 'PLUS', Literal: '+' };
        break;
      case '{':
        token = { Type: 'LBRACE', Literal: '{' };
        break;
      case '}':
        token = { Type: 'RBRACE', Literal: '}' };
        break;
      case 0:
        token = { Type: 'EOF', Literal: '' };
        break;
      default:
        if (this.isLetter(this.ch)) {
          const ident = this.readIdentifier();
          if (ident === 'fn') {
            token = { Type: 'FUNCTION', Literal: ident };
          } else if (ident === 'let') {
            token = { Type: 'LET', Literal: ident };
          } else {
            token = { Type: 'IDENT', Literal: ident };
          }
          return token;
        } else if (this.isDigit(this.ch)) {
          token = { Type: 'INT', Literal: this.readNumber() };
          return token;
        } else {
          token = { Type: 'ILLEGAL', Literal: this.ch as string };
        }
    }
    this.readChar();
    return token;
  }

  private readIdentifier() {
    const position = this.position;
    while (this.isLetter(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }

  private isLetter(ch: string | number) {
    return ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z') || ch == '_';
  }

  private isDigit(ch: string | number) {
    return '0' <= ch && ch <= '9';
  }

  private readNumber() {
    const position = this.position;
    while (this.isDigit(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }

  private skipWhitespace() {
    while (
      this.ch === ' ' ||
      this.ch === '\t' ||
      this.ch === '\n' ||
      this.ch === '\r'
    ) {
      this.readChar();
    }
  }
}
