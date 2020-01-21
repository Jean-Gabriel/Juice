import {Token} from "./Token";
import {StringLexemeReader} from "../utils/StringLexemeReader";
import {TokenType} from "./TokenType";

export class Tokenizer {
    private keywords = new Map<string, TokenType>();
    private tokens: Token[] = [];

    constructor(private reader: StringLexemeReader) {
        this.keywords.set('obj', TokenType.OBJECT);
        this.keywords.set('else', TokenType.ELSE);
        this.keywords.set('if', TokenType.IF);
        this.keywords.set('fun', TokenType.FUNCTION);
        this.keywords.set('for', TokenType.FOR);
        this.keywords.set('null', TokenType.NULL);
        this.keywords.set('return', TokenType.RETURN);
        this.keywords.set('true', TokenType.BOOLEAN);
        this.keywords.set('false', TokenType.BOOLEAN);
        this.keywords.set('val', TokenType.VAL);
        this.keywords.set('while', TokenType.WHILE);
        this.keywords.set('and', TokenType.AND);
        this.keywords.set('new', TokenType.NEW);
        this.keywords.set('uint', TokenType.UINT_TYPE);
        this.keywords.set('boolean', TokenType.BOOLEAN_TYPE);
        this.keywords.set('string', TokenType.STRING_TYPE);
        this.keywords.set('print', TokenType.PRINT);
    }

    tokenize(): Token[] {
        let char = '';

        while (!this.reader.isAtEnd()) {
            this.reader.fixStartPosition();
            char = this.reader.advance();

            switch (char) {
                case '\n': this.reader.nextLine(); break;
                case '#': this.reader.advanceLine(); break;

                case '(': this.addNonLiterateToken(TokenType.LEFT_PARENTHESIS); break;
                case ')': this.addNonLiterateToken(TokenType.RIGHT_PARENTHESIS); break;
                case '{': this.addNonLiterateToken(TokenType.LEFT_BRACKET); break;
                case '}': this.addNonLiterateToken(TokenType.RIGHT_BRACKET); break;
                case '-': this.addNonLiterateToken(TokenType.MINUS); break;
                case '+': this.addNonLiterateToken(TokenType.PLUS); break;
                case '*': this.addNonLiterateToken(TokenType.STAR); break;
                case '%': this.addNonLiterateToken(TokenType.MODULO); break;
                case '/': this.addNonLiterateToken(TokenType.SLASH); break;
                case '.': this.addNonLiterateToken(TokenType.DOT); break;
                case ",": this.addNonLiterateToken(TokenType.COMMA); break;

                case '!': this.addNonLiterateToken(this.reader.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG); break;
                case '=': this.addNonLiterateToken(this.reader.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL); break;
                case '<': this.addNonLiterateToken(this.reader.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS); break;
                case '>': this.addNonLiterateToken(this.reader.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER); break;

                case '"': this.addStringToken(); break;
                case "|":
                    if(this.reader.match('|')) {
                        this.addNonLiterateToken(TokenType.OR);
                    }
                    break;

                case ' ':
                case '':
                case '\r':
                case '\t':
                    break;

                default:
                    if(this.isDigit(char)) {
                        this.addNumberToken();
                    } else if(this.isAlpha(char)) {
                        this.addIdentifierToken();
                    } else {
                        this.report('Non-supported character found while creating tokens');
                    }
                    break;
            }
        }

        return this.tokens;
    }

    private report(error: string) {
        throw new Error(`${error} occurred at position: ${this.reader.getCoordinates()}`);
    }

    private addIdentifierToken() {
        while(!this.reader.isAtEnd() && this.isAlphaNumeric(this.reader.peek())) {
            this.reader.advance();
        }

        const value = this.reader.currentLexeme();
        let tokenType = this.keywords.get(value.toLowerCase());
        if(!tokenType) {
            tokenType = TokenType.IDENTIFIER;
        }

        if(tokenType == TokenType.BOOLEAN) {
            return this.addToken(tokenType, value);
        }

        this.addNonLiterateToken(tokenType);
    }

    private addNumberToken() {
        while(this.isDigit(this.reader.peek()) && !this.reader.isAtEnd()) {
            this.reader.advance();
        }

        const value = this.reader.currentLexeme();
        this.addToken(TokenType.NUMBER, value);
    }

    private addStringToken() {
        while(this.reader.peek() != '"' && !this.reader.isAtEnd()) {
            if(this.reader.peek() == '\n') {
                this.reader.nextLine();
            }
            this.reader.advance();
        }

        if(this.reader.isAtEnd()) {
            this.report('Unfinished string.');
        }

        this.reader.advance();
        const value = this.reader.currentStringLexeme();
        this.addToken(TokenType.STRING, value);
    }

    private addNonLiterateToken(type: TokenType) {
        this.addToken(type, '');
    }

    private addToken(type: TokenType, literal: string) {
        this.tokens.push(new Token(type, this.reader.currentLexeme(), literal, this.reader.getLine()));
    }

    private isDigit(char: string) {
        return char >= '0' && char <= '9';
    }

    private isAlpha(char: string) {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char == '_';
    }

    private isAlphaNumeric(char: string) {
        return this.isDigit(char) || this.isAlpha(char);
    }
}
