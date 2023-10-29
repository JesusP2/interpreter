import { Token } from '@/token';

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
      default:
        token = { Type: 'EOF', Literal: '' };
    }
    this.readChar();
    return token;
  }
}
