import {TokenReader} from "../Token/TokenReader";
import {TokenType} from "../Token/TokenType";
import {BinaryExpression} from "./Expression/Expressions/BinaryExpression";
import {UnaryExpression} from "./Expression/Expressions/UnaryExpression";
import {LiteralExpression} from "./Expression/Expressions/LiteralExpression";
import {Expression} from "./Expression/Expression";

export class Parser {
    constructor(private tokenReader: TokenReader) {}

    parse() {
        return this.parseExpression();
    }

    private report(error: string) {
        throw new Error(`${error} occurred for token: ${this.tokenReader.current().toString()}`);
    }

    private parseExpression(): Expression {
        return this.parseEquality();
    }

    private parseEquality(): Expression {
        let left = this.parseComparison();

        while(this.tokenReader.currentTokenTypeMatchesAny(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
            const operator = this.tokenReader.previous();
            const right = this.parseComparison();
            left = new BinaryExpression(left, operator, right);
        }

        return left;
    }

    private parseComparison(): Expression {
        let left = this.parseAddition();

        while(this.tokenReader.currentTokenTypeMatchesAny(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)) {
            const operator = this.tokenReader.previous();
            const right = this.parseAddition();
            left = new BinaryExpression(left, operator, right);
        }

        return left;
    }

    private parseAddition(): Expression {
        let left = this.parseMultiplication();

        while(this.tokenReader.currentTokenTypeMatchesAny(TokenType.MINUS, TokenType.PLUS)) {
            const operator = this.tokenReader.previous();
            const right = this.parseMultiplication();
            left = new BinaryExpression(left, operator, right);
        }

        return left;
    }

    private parseMultiplication(): Expression{
        let left = this.parseUnary();

        while(this.tokenReader.currentTokenTypeMatchesAny(TokenType.SLASH, TokenType.STAR, TokenType.MODULO)) {
            const operator = this.tokenReader.previous();
            const right = this.parseUnary();
            left = new BinaryExpression(left, operator, right);
        }

        return left;
    }

    private parseUnary(): Expression {
        if(this.tokenReader.currentTokenTypeMatchesAny(TokenType.MINUS, TokenType.SLASH)) {
            const operator = this.tokenReader.previous();
            const right = this.parseUnary();
            return new UnaryExpression(operator, right);
        }

        return this.parsePrimary() as Expression;
    }

    private parsePrimary() {
        if(this.tokenReader.currentTokenTypeMatches(TokenType.NULL)) {
            return new LiteralExpression(null);
        }

        if(this.tokenReader.currentTokenTypeMatchesAny(TokenType.NUMBER, TokenType.STRING, TokenType.BOOLEAN)) {
            return new LiteralExpression(this.tokenReader.previous());
        }

        if(this.tokenReader.currentTokenTypeMatches(TokenType.LEFT_PARENTHESIS)) {
            const expression = this.parseExpression();

            if(!this.tokenReader.currentTokenTypeMatches(TokenType.RIGHT_PARENTHESIS)) {
                throw new Error("Expected right parenthesis after primary expression");
            }

            return expression
        }

        this.report("Undefined literal")
    }

}
