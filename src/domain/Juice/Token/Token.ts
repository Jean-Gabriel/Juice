import {TokenType} from "./TokenType";

export class Token {
    constructor(private readonly type: TokenType, private readonly lexeme: string, private readonly value: string, private readonly line: number) {}

    public getValue() {
        if(this.hasAnyType(TokenType.BOOLEAN, TokenType.NUMBER, TokenType.STRING)) {
            return this.value;
        }

        return this.lexeme;
    }

    public hasAnyType(...types: TokenType[]) {
        return types.includes(this.type);
    }

    public hasType(type: TokenType) {
        return this.type == type;
    }

    public getType() {
        return this.type;
    }

    public getLine() {
        return this.line;
    }

    public toString(): string {
        if(this.value != '') {
            return `Token: ${this.type}, ${this.value}, at line: ${this.line}.`;
        } else {
            return `Token: ${this.type}, ${this.lexeme}, at line: ${this.line}.`;
        }
    }
}
