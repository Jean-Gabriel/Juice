import {Token} from "./Token";
import {TokenType} from "./TokenType";

export class TokenReader {
    private currentToken = 0;

    constructor(private tokens: Token[]) {}

    doTokenTypeMatchAny(...types: TokenType[]) {
        const hasAnyType = this.current().hasAnyType(...types);
        if(hasAnyType) {
            this.advance();
        }

        const result = () => hasAnyType;
        const orElse = (callback: () => void) => {
            if(!result()) {
                callback();
            }
        };

        return {
            result,
            orElse
        };
    }

    doTokenTypeMatch(type: TokenType) {
        return this.doTokenTypeMatchAny(type);
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

    isAtStart() {
        return this.currentToken == 0;
    }
}
