import {Token} from "../Token";
import {MockToken} from "../../../../mock/Token";
import {TokenType} from "../TokenType";

describe('Token', () => {
    describe('given a token with a type', () => {
       it('should have one of given types', () => {
           const token = new MockToken().withType(TokenType.EQUAL).get();

           const hasOneOfGivenType = token.hasAnyType(TokenType.COMMA, TokenType.EQUAL, TokenType.BOOLEAN_TYPE);

           expect(hasOneOfGivenType).toBeTruthy();
       });

       it('should not have one of given types', () => {
           const token = new MockToken().withType(TokenType.BOOLEAN_TYPE).get();

           const hasOneOfGivenType = token.hasAnyType(TokenType.EQUAL, TokenType.COMMA, TokenType.LEFT_PARENTHESIS);

           expect(hasOneOfGivenType).toBeFalsy();
       });

       it('should have type', () => {
           const token = new MockToken().withType(TokenType.BOOLEAN_TYPE).get();

           const hasOneOfGivenType = token.hasType(TokenType.BOOLEAN_TYPE);

           expect(hasOneOfGivenType).toBeTruthy();
       });

       it('should have type', () => {
           const token = new MockToken().withType(TokenType.BOOLEAN_TYPE).get();

           const hasOneOfGivenType = token.hasType(TokenType.NUMBER);

           expect(hasOneOfGivenType).toBeFalsy();
       });
    });

    describe('given a token with a value', () => {
        it('should return its value', () => {
            const token = new MockToken().withType(TokenType.STRING).withValue('tiktok').get();
            const expectedValue = 'tiktok';

            const value = token.getValue();

            expect(value).toEqual(expectedValue);
        });
    });

    describe('given a token that is not a string, number or boolean', () => {
        it('should return its lexeme', () => {
            const token = new MockToken().withType(TokenType.IDENTIFIER).withLexeme('test').withValue('tiktok').get();
            const expectedLexeme = 'test';

            const lexeme = token.getValue();

            expect(lexeme).toEqual(expectedLexeme);
        });
    });
});
