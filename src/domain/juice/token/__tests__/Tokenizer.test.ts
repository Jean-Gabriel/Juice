import {Point} from "../../../math/Point";
import {Tokenizer} from "../Tokenizer";
import {StringReader} from "../../../utils/StringReader";
import {MockToken} from "../../../../mock/Token";
import {Token} from "../Token";
import {TokenType} from "../TokenType";
import {provideTestReporter} from "../../../../infrastructure/juice/reporter/TestReporter";

describe('Tokenizer', () => {
    let reporter = provideTestReporter();

    function provideStringReaderFor(content: string) {
        return new StringReader(content);
    }

    function provideTokenizerFor(content: string) {
        return new Tokenizer(provideStringReaderFor(content), reporter);
    }

    beforeEach(() => {
        reporter = provideTestReporter();

    });

    describe('when encountering new line character', () => {
        it('should increment line counter', () => {
            const content = '\n';
            const expectedPosition = new Point(2, 0);
            const reader = provideStringReaderFor(content);
            const tokenizer = new Tokenizer(reader, reporter);

            tokenizer.tokenize();

            expect(reader.getCoordinates()).toEqual(expectedPosition);
        });
    });

    describe('when encountering a comment character', () => {
        it('should ignore everything after until next line', () => {
            expectTokenEqual('# should be ignored \n a', [
                new MockToken(TokenType.IDENTIFIER).withLexeme('a').withPosition(new Point(1, 22)).get(),
            ]);
        });
    });

    it('should tokenize left parenthesis', () => {
        expectTokenEqual('(', [
            new MockToken(TokenType.LEFT_PARENTHESIS).withLexeme("(").get(),
        ]);
    });

    it('should tokenize right parenthesis', () => {
        expectTokenEqual(')', [
            new MockToken(TokenType.RIGHT_PARENTHESIS).withLexeme(")").get(),
        ]);
    });

    it('should tokenize left bracket', () => {
        expectTokenEqual('{', [
            new MockToken(TokenType.LEFT_BRACKET).withLexeme("{").get(),
        ]);
    });

    it('should tokenize right bracket', () => {
        expectTokenEqual('}', [
            new MockToken(TokenType.RIGHT_BRACKET).withLexeme("}").get(),
        ]);
    });

    it('should tokenize minus', () => {
        expectTokenEqual('-', [
            new MockToken(TokenType.MINUS).withLexeme("-").get(),
        ]);
    });

    it('should tokenize plus', () => {
        expectTokenEqual('+', [
            new MockToken(TokenType.PLUS).withLexeme("+").get(),
        ]);
    });

    it('should tokenize star', () => {
        expectTokenEqual('*', [
            new MockToken(TokenType.STAR).withLexeme("*").get(),
        ]);
    });

    it('should tokenize modulo', () => {
        expectTokenEqual('%', [
            new MockToken(TokenType.MODULO).withLexeme("%").get(),
        ]);
    });

    it('should tokenize slash', () => {
        expectTokenEqual('/', [
            new MockToken(TokenType.SLASH).withLexeme("/").get(),
        ]);
    });

    it('should tokenize dot', () => {
        expectTokenEqual('.', [
            new MockToken(TokenType.DOT).withLexeme(".").get(),
        ]);
    });

    it('should tokenize comma', () => {
        expectTokenEqual(',', [
            new MockToken(TokenType.COMMA).withLexeme(",").get(),
        ]);
    });

    it('should tokenize bang', () => {
        expectTokenEqual('!', [
            new MockToken(TokenType.BANG).withLexeme("!").get(),
        ]);
    });

    it('should tokenize bang equal', () => {
        expectTokenEqual('!=', [
            new MockToken(TokenType.BANG_EQUAL).withLexeme("!=").get(),
        ]);
    });

    it('should tokenize equal', () => {
        expectTokenEqual('=', [
            new MockToken(TokenType.EQUAL).withLexeme('=').get(),
        ]);
    });

    it('should tokenize equal equal', () => {
        expectTokenEqual('==', [
            new MockToken(TokenType.EQUAL_EQUAL).withLexeme("==").get(),
        ]);
    });

    it('should tokenize greater sign', () => {
        expectTokenEqual('>', [
            new MockToken(TokenType.GREATER).withLexeme(">").get(),
        ]);
    });

    it('should tokenize less sign', () => {
        expectTokenEqual('<', [
            new MockToken(TokenType.LESS).withLexeme("<").get(),
        ]);
    });

    it('should tokenize greater equal sign', () => {
        expectTokenEqual('>=', [
            new MockToken(TokenType.GREATER_EQUAL).withLexeme(">=").get(),
        ]);
    });

    it('should tokenize less equal sign', () => {
        expectTokenEqual('<=', [
            new MockToken(TokenType.LESS_EQUAL).withLexeme("<=").get(),
        ]);
    });

    it('should tokenize string ', () => {
        expectTokenEqual('"tiktok"', [
            new MockToken(TokenType.STRING).withLexeme('"tiktok"').withValue('tiktok').get()
        ]);
    });

    it('should tokenize uint', () => {
        expectTokenEqual('2', [
            new MockToken(TokenType.NUMBER).withLexeme('2').withValue('2').get()
        ]);
    });

    it('should tokenize "false" value', () => {
        expectTokenEqual('false', [
            new MockToken(TokenType.BOOLEAN).withLexeme('false').withValue('false').get()
        ]);
    });

    it('should tokenize "true" value', () => {
        expectTokenEqual('true', [
            new MockToken(TokenType.BOOLEAN).withLexeme('true').withValue('true').get()
        ]);
    });

    it('should tokenize variable declaration', () => {
        expectTokenEqual('val name = "John"', [
            new MockToken().withType(TokenType.VAL).withLexeme('val').withPosition(new Point(1,0)).get(),
            new MockToken().withType(TokenType.IDENTIFIER).withLexeme('name').withPosition(new Point(1,4)).get(),
            new MockToken().withType(TokenType.EQUAL).withLexeme('=').withPosition(new Point(1,9)).get(),
            new MockToken().withType(TokenType.STRING).withLexeme('"John"').withValue("John").withPosition(new Point(1, 11)).get(),
        ]);
    });

    it('should tokenize object declaration', () => {
        expectTokenEqual('obj Person {}', [
            new MockToken().withType(TokenType.OBJECT).withLexeme('obj').withPosition(new Point(1, 0)).get(),
            new MockToken().withType(TokenType.IDENTIFIER).withLexeme('Person').withPosition(new Point(1, 4)).get(),
            new MockToken().withType(TokenType.LEFT_BRACKET).withLexeme('{').withPosition(new Point(1, 11)).get(),
            new MockToken().withType(TokenType.RIGHT_BRACKET).withLexeme('}').withPosition(new Point(1, 12)).get(),
        ]);
    });

    it('should tokenize function declaration', () => {
        expectTokenEqual('fun returnTrue(): uint { return true }', [
            new MockToken().withType(TokenType.FUNCTION).withLexeme('fun').withPosition(new Point(1, 0)).get(),
            new MockToken().withType(TokenType.IDENTIFIER).withLexeme('returnTrue').withPosition(new Point(1, 4)).get(),
            new MockToken().withType(TokenType.LEFT_PARENTHESIS).withLexeme('(').withPosition(new Point(1, 14)).get(),
            new MockToken().withType(TokenType.RIGHT_PARENTHESIS).withLexeme(')').withPosition(new Point(1, 15)).get(),
            new MockToken().withType(TokenType.COLON).withLexeme(':').withPosition(new Point(1, 16)).get(),
            new MockToken().withType(TokenType.UINT_TYPE).withLexeme('uint').withPosition(new Point(1, 18)).get(),
            new MockToken().withType(TokenType.LEFT_BRACKET).withLexeme('{').withPosition(new Point(1, 23)).get(),
            new MockToken().withType(TokenType.RETURN).withLexeme('return').withPosition(new Point(1, 25)).get(),
            new MockToken().withType(TokenType.BOOLEAN).withLexeme('true').withValue('true').withPosition(new Point(1, 32)).get(),
            new MockToken().withType(TokenType.RIGHT_BRACKET).withLexeme('}').withPosition(new Point(1, 37)).get(),
        ]);
    });

    it('should tokenize uint type', () => {
        expectTokenEqual('uint', [
            new MockToken().withType(TokenType.UINT_TYPE).withLexeme('uint').withPosition(new Point(1, 0)).get()
        ]);
    });

    it('should tokenize string type', () => {
        expectTokenEqual('string', [
            new MockToken().withType(TokenType.STRING_TYPE).withLexeme('string').withPosition(new Point(1, 0)).get()
        ]);
    });

    it('should tokenize boolean type', () => {
        expectTokenEqual('boolean', [
            new MockToken().withType(TokenType.BOOLEAN_TYPE).withLexeme('boolean').withPosition(new Point(1, 0)).get()
        ]);
    });

    it('should call reporter on error', () => {
        const content = '"fail';
        const tokenizer = provideTokenizerFor(content);

        const tokens = tokenizer.tokenize();

        expect(tokens.length).toEqual(0);
        expect(reporter.error).toHaveBeenCalledTimes(2);
        expect(reporter.print).toHaveBeenCalledTimes(1);
    });

    function expectTokenEqual(content: string, expectedTokens: Token[]) {
        const tokenizer = provideTokenizerFor(content);

        const tokens = tokenizer.tokenize();

        expectedTokens.forEach(token => expect(tokens).toContainEqual(token));
    }
});
