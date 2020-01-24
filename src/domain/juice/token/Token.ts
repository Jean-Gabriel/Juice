import {TokenType} from "./TokenType";
import {Point} from "../../math/Point";

export type TokenValue = string;
export type Lexeme = string;

export class Token {
    constructor(private readonly type: TokenType, private readonly lexeme: Lexeme, private readonly value: TokenValue, private readonly position: Point) {}

    public hasAnyType(...types: TokenType[]) {
        return types.includes(this.type);
    }

    public hasType(type: TokenType) {
        return this.type == type;
    }

    public getType() {
        return this.type;
    }

    public getValue() {
        if(!this.hasAnyType(TokenType.BOOLEAN, TokenType.NUMBER, TokenType.STRING)){
            return this.lexeme;
        }

        return this.value;
    }

    public getLexeme() {
        return this.lexeme;
    }

    public getPosition() {
        return this.position;
    }

    public toString(): string {
        if(this.value) {
            return `Token: ${this.type}, ${this.lexeme}, ${this.value}, at position: ${this.position.toString()}.`;
        }

        return `Token: ${this.type}, ${this.lexeme}, at position: ${this.position.toString()}.`;
    }
}
