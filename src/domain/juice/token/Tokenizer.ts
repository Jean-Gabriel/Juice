import {Token} from "./Token";
import {StringReader} from "../../utils/StringReader";
import {TokenType} from "./TokenType";
import {isAlpha, isAlphaNumeric, isDigit} from "../../utils/AlphaNumeric";
import {keywords} from "./Keywords";

export class Tokenizer {
    private tokens: Token[] = [];

    constructor(private reader: StringReader) {}

    tokenize(): Token[] {
        let char = '';

        while (!this.reader.isAtEnd()) {
            this.reader.fixStartPosition();
            char = this.reader.advance();

            switch (char) {
                case '\n': this.reader.nextLine(); break;
                case '#': this.reader.advanceWhile(() => this.reader.peek() != '\n').then(() => this.reader.advance()); break;

                case '(': this.addNonValuedToken(TokenType.LEFT_PARENTHESIS); break;
                case ')': this.addNonValuedToken(TokenType.RIGHT_PARENTHESIS); break;
                case '{': this.addNonValuedToken(TokenType.LEFT_BRACKET); break;
                case '}': this.addNonValuedToken(TokenType.RIGHT_BRACKET); break;
                case '-': this.addNonValuedToken(TokenType.MINUS); break;
                case '+': this.addNonValuedToken(TokenType.PLUS); break;
                case '*': this.addNonValuedToken(TokenType.STAR); break;
                case '%': this.addNonValuedToken(TokenType.MODULO); break;
                case '/': this.addNonValuedToken(TokenType.SLASH); break;
                case '.': this.addNonValuedToken(TokenType.DOT); break;
                case ",": this.addNonValuedToken(TokenType.COMMA); break;

                case '!': this.addNonValuedToken(this.reader.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG); break;
                case '=': this.addNonValuedToken(this.reader.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL); break;
                case '<': this.addNonValuedToken(this.reader.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS); break;
                case '>': this.addNonValuedToken(this.reader.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER); break;

                case '"': this.addStringToken(); break;

                case ' ':
                case '':
                case '\r':
                case '\t':
                    break;

                default:
                    if(isDigit(char)) {
                        this.addNumberToken();
                    } else if(isAlpha(char)) {
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
        this.reader.advanceWhile(() => isAlphaNumeric(this.reader.peek()));

        const value = this.reader.retrieve();
        let tokenType = keywords.get(value.toLowerCase());
        if(!tokenType) {
            tokenType = TokenType.IDENTIFIER;
        }

        if(tokenType == TokenType.BOOLEAN) {
            return this.addToken(tokenType, value);
        }

        this.addNonValuedToken(tokenType);
    }

    private addNumberToken() {
        this.reader.advanceWhile(() => isDigit(this.reader.peek()));
        const value = this.reader.retrieve();
        this.addToken(TokenType.NUMBER, value);
    }

    private addStringToken() {
        const consumed = this.reader.advanceWhile(() => this.reader.peek() != '"').getConsumed();

        if(this.reader.isAtEnd() && this.reader.peek() != '"') {
            this.report('Unfinished string');
        }

        this.reader.advance();
        this.addToken(TokenType.STRING, consumed);
    }

    private addNonValuedToken(type: TokenType) {
        this.addToken(type, '');
    }

    private addToken(type: TokenType, value: string) {
        this.tokens.push(new Token(type, this.reader.retrieve(), value, this.reader.getCoordinates()));
    }
}
