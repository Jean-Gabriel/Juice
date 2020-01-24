import {TokenType} from "../domain/juice/token/TokenType";
import {Lexeme, Token, TokenValue} from "../domain/juice/token/Token";
import {Point} from "../domain/math/Point";

export class MockToken {
    constructor(
        private type: TokenType = TokenType.EQUAL,
        private lexeme: Lexeme = '=',
        private value: TokenValue = '',
        private position: Point = new Point(1, 0)
    ) {}

    withType(type: TokenType) {
        this.type = type;

        return this;
    }

    withPosition(position: Point) {
        this.position = position;

        return this;
    }

    withValue(value: TokenValue) {
        this.value = value;

        return this;
    }

    withLexeme(lexeme: Lexeme) {
        this.lexeme = lexeme;

        return this;
    }

    get() {
        return new Token(this.type, this.lexeme, this.value, this.position);
    }
}
