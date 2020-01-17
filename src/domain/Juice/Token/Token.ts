import {TokenType} from "./TokenType";

export class Token {
    constructor(private readonly type: TokenType, private readonly lexeme: string, private readonly literal: string, private readonly line: number) {}

    public value() {
        if(this.hasAnyType(TokenType.BOOLEAN, TokenType.NUMBER, TokenType.STRING)) {
            return this.literal;
        }

        return this.lexeme;
    }

    public hasAnyType(...types: TokenType[]) {
        return types.includes(this.type);
    }

    public hasType(type: TokenType) {
        return this.type == type;
    }

    public getLine() {
        return this.line;
    }

    public toString(): string {
        if(this.literal != '') {
            return `Token: ${this.type}, ${this.lexeme}, ${this.literal}, at line: ${this.line}.`;
        } else {
            return `Token: ${this.type}, ${this.lexeme}, at line: ${this.line}.`;
        }
    }
}
