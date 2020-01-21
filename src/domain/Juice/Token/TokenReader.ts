import {Token} from "./Token";
import {TokenType} from "./TokenType";

export class TokenReader {
    private currentToken = 0;

    constructor(private tokens: Token[]) {}

    currentTokenTypeMatchesAny(...types: TokenType[]) {
        if(!this.current().hasAnyType(...types)) {
            return false;
        }

        this.advance();
        return true;
    }

    currentTokenTypeMatches(type: TokenType) {
        if(!this.current().hasType(type)) {
            return false;
        }

        this.advance();
        return true;
    }

    current() {
        if(this.isAtEnd()) {
            return this.previous();
        }
        return this.tokens[this.currentToken];
    }

    currentType() {
        return this.current().getType();
    }

    advance() {
        if(this.isAtEnd()) {
            return this.previous();
        }

        return this.tokens[this.currentToken++];
    }

    previous() {
        if(this.currentToken == 0) {
            return this.tokens[this.currentToken];
        }
        return this.tokens[this.currentToken - 1];
    }

    isAtEnd() {
        return this.currentToken == this.tokens.length;
    }
}
