import {Token} from "./Token";
import {TokenType} from "./TokenType";

export class TokenReader {
    private currentToken = 0;

    constructor(private tokens: Token[]) {}

    consumeIfTokenTypeMatchAny(...types: TokenType[]) {
        const hasAnyType = this.current().hasAnyType(...types);
        if(hasAnyType) {
            this.advance();
        }

        const doMatch = () => hasAnyType;
        const orElse = (callback: () => void) => {
            if(!doMatch()) {
                callback();
            }
        };

        return {
            doMatch,
            orElse
        };
    }

    consumeIfTokenTypeMatch(type: TokenType) {
        return this.consumeIfTokenTypeMatchAny(type);
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

    previousValue() {
        return this.previous().getValue();
    }

    previousType() {
        return this.previous().getType();
    }

    isAtEnd() {
        return this.currentToken == this.tokens.length;
    }

    isAtStart() {
        return this.currentToken == 0;
    }
}
