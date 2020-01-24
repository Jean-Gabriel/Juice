import {Point} from "../../../math/Point";
import {Tokenizer} from "../Tokenizer";
import {StringReader} from "../../../utils/StringReader";
import {MockToken} from "../../../../mock/Token";
import {Token} from "../Token";
import {TokenType} from "../TokenType";

describe('Tokenizer', () => {
    describe('when encountering new line character', () => {
        it('should increment line counter', () => {
            const content = '\n';
            const expectedPosition = new Point(2, 0);
            const reader = new StringReader(content);
            const tokenizer = new Tokenizer(reader);

            tokenizer.tokenize();

            expect(reader.getCoordinates()).toEqual(expectedPosition);
        });
    });

    describe('when encountering a comment character', () => {
        it('should ignore everything after until next line', () => {
            const content = '# should be ignored \n a';
            const tokenizer = provideTokenizerFor(content);
            const expectedTokens = [ new Token(TokenType.IDENTIFIER, 'a', '', new Point(1,22)) ];

            const tokens = tokenizer.tokenize();

            expect(tokens).toEqual(expectedTokens);
        });
    });

    it('should tokenize left parenthesis', () => {
        const content = '(';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.LEFT_PARENTHESIS).withLexeme('(').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize right parenthesis', () => {
        const content = ')';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.RIGHT_PARENTHESIS).withLexeme(')').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize left bracket', () => {
        const content = '{';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.LEFT_BRACKET).withLexeme('{').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize right bracket', () => {
        const content = '}';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.RIGHT_BRACKET).withLexeme('}').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize minus', () => {
        const content = '-';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.MINUS).withLexeme('-').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize plus', () => {
        const content = '+';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.PLUS).withLexeme('+').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize star', () => {
        const content = '*';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.STAR).withLexeme('*').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize modulo', () => {
        const content = '%';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.MODULO).withLexeme('%').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize slash', () => {
        const content = '/';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.SLASH).withLexeme('/').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize dot', () => {
        const content = '.';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.DOT).withLexeme('.').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize comma', () => {
        const content = ',';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.COMMA).withLexeme(',').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize bang', () => {
        const content = '!';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.BANG).withLexeme('!').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize bang equal', () => {
        const content = '!=';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.BANG_EQUAL).withLexeme('!=').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize equal', () => {
        const content = '=';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.EQUAL).withLexeme('=').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize equal equal', () => {
        const content = '==';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.EQUAL_EQUAL).withLexeme('==').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize greater sign', () => {
        const content = '>';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.GREATER).withLexeme('>').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize less sign', () => {
        const content = '<';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.LESS).withLexeme('<').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize greater equal sign', () => {
        const content = '>=';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.GREATER_EQUAL).withLexeme('>=').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize less equal sign', () => {
        const content = '<=';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.LESS_EQUAL).withLexeme('<=').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize string ', () => {
        const content = '"tiktok"';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.STRING).withLexeme('"tiktok"').withValue('tiktok').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize uint', () => {
        const content = '2';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.NUMBER).withLexeme('2').withValue('2').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize "false" value', () => {
        const content = 'false';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.BOOLEAN).withLexeme('false').withValue('false').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize "true" value', () => {
        const content = 'true';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken(TokenType.BOOLEAN).withLexeme('true').withValue('true').get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize variable declaration', () => {
        const content = 'val name = "John"';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [
            new MockToken().withType(TokenType.VAL).withLexeme('val').withPosition(new Point(1,0)).get(),
            new MockToken().withType(TokenType.IDENTIFIER).withLexeme('name').withPosition(new Point(1,4)).get(),
            new MockToken().withType(TokenType.EQUAL).withLexeme('=').withPosition(new Point(1,9)).get(),
            new MockToken().withType(TokenType.STRING).withLexeme('"John"').withValue("John").withPosition(new Point(1, 11)).get(),
        ];

        const tokens = tokenizer.tokenize();

        expectedTokens.forEach(token => expect(tokens).toContainEqual(token));
    });

    it('should tokenize object declaration', () => {
        const content = 'obj Person {}';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [
            new MockToken().withType(TokenType.OBJECT).withLexeme('obj').withPosition(new Point(1, 0)).get(),
            new MockToken().withType(TokenType.IDENTIFIER).withLexeme('Person').withPosition(new Point(1, 4)).get(),
            new MockToken().withType(TokenType.LEFT_BRACKET).withLexeme('{').withPosition(new Point(1, 11)).get(),
            new MockToken().withType(TokenType.RIGHT_BRACKET).withLexeme('}').withPosition(new Point(1, 12)).get(),
        ];

        const tokens = tokenizer.tokenize();

        expectedTokens.forEach(token => expect(tokens).toContainEqual(token));
    });

    it('should tokenize function declaration', () => {
        const content = 'fun returnTrue() { return true }';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [
            new MockToken().withType(TokenType.FUNCTION).withLexeme('fun').withPosition(new Point(1, 0)).get(),
            new MockToken().withType(TokenType.IDENTIFIER).withLexeme('returnTrue').withPosition(new Point(1, 4)).get(),
            new MockToken().withType(TokenType.LEFT_PARENTHESIS).withLexeme('(').withPosition(new Point(1, 14)).get(),
            new MockToken().withType(TokenType.RIGHT_PARENTHESIS).withLexeme(')').withPosition(new Point(1, 15)).get(),
            new MockToken().withType(TokenType.LEFT_BRACKET).withLexeme('{').withPosition(new Point(1, 17)).get(),
            new MockToken().withType(TokenType.RETURN).withLexeme('return').withPosition(new Point(1, 19)).get(),
            new MockToken().withType(TokenType.BOOLEAN).withLexeme('true').withValue('true').withPosition(new Point(1, 26)).get(),
            new MockToken().withType(TokenType.RIGHT_BRACKET).withLexeme('}').withPosition(new Point(1, 31)).get(),
        ];

        const tokens = tokenizer.tokenize();

        expectedTokens.forEach(token => expect(tokens).toContainEqual(token));
    });

    it('should tokenize uint type', () => {
        const content = 'uint';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken().withType(TokenType.UINT_TYPE).withLexeme('uint').withPosition(new Point(1, 0)).get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize string type', () => {
        const content = 'string';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken().withType(TokenType.STRING_TYPE).withLexeme('string').withPosition(new Point(1, 0)).get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize boolean type', () => {
        const content = 'boolean';
        const tokenizer = provideTokenizerFor(content);
        const expectedTokens = [ new MockToken().withType(TokenType.BOOLEAN_TYPE).withLexeme('boolean').withPosition(new Point(1, 0)).get() ];

        const tokens = tokenizer.tokenize();

        expect(tokens).toEqual(expectedTokens);
    });

    function provideTokenizerFor(content: string) {
        return new Tokenizer(new StringReader(content));
    }
});
