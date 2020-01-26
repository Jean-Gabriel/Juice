import {MockToken} from "../../../../mock/Token";
import {TokenReader} from "../TokenReader";
import {TokenType} from "../TokenType";

describe('TokenReader', () => {
    describe('when reader is at end', () => {
        it('should return last token as the current one', () => {
            const tokenReader = new TokenReader([ new MockToken().get() ]);
            const expectedToken = new MockToken().get();
            tokenReader.advance();

            const token = tokenReader.current();

            expect(token).toEqual(expectedToken);
        });
    });

    describe('when reader is at start', () => {
        it('should return first token as the previous', () => {
            const tokenReader = new TokenReader([ new MockToken().get() ]);
            const expectedToken = new MockToken().get();

            const token = tokenReader.current();

            expect(token).toEqual(expectedToken);
        });
    });

    it('should return the previous token', () => {
        const tokens = [
            new MockToken().withType(TokenType.MINUS).get(),
            new MockToken().withType(TokenType.STAR).get(),
        ];
        const tokenReader = new TokenReader(tokens);
        const expectedToken = new MockToken().withType(TokenType.MINUS);
        tokenReader.advance();

        const token = tokenReader.previous();

        expect(token).toEqual(expectedToken);
    });

    it('should return current token', () => {
        const tokens = [
            new MockToken().withType(TokenType.MINUS).get(),
            new MockToken().withType(TokenType.STAR).get(),
        ];
        const tokenReader = new TokenReader(tokens);
        const expectedToken = new MockToken().withType(TokenType.MINUS);

        const token = tokenReader.current();

        expect(token).toEqual(expectedToken);
    });

    it('should not call callback if type match', () => {
        const tokens = [ new MockToken().withType(TokenType.MINUS).get() ];
        const tokenReader = new TokenReader(tokens);
        let value = 1;

        tokenReader.consumeIfTokenTypeMatch(TokenType.MINUS).orElse(() => value++);

        expect(value).toEqual(1);
    });

    it('should call callback if type do not match', () => {
        const tokens = [ new MockToken().withType(TokenType.MINUS).get() ];
        const tokenReader = new TokenReader(tokens);
        let value = 1;

        tokenReader.consumeIfTokenTypeMatch(TokenType.PLUS).orElse(() => value++);

        expect(value).toEqual(2);
    });
});
