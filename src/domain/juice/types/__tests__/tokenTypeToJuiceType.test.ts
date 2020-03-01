import {JuiceType} from "../JuiceTypes";
import {TokenType} from "../../token/TokenType";
import {tokenTypeToJuiceType} from "../tokenTypeToJuiceType";

describe('tokenTypeToJuiceType', () => {
    it('should convert string type token to native string type', () => {
       const expectedNativeType = JuiceType.STRING;
       const tokenType = TokenType.STRING_TYPE;

       const nativeType = tokenTypeToJuiceType(tokenType);

       expect(nativeType).toEqual(expectedNativeType);
    });

    it('should convert uint type token to native uint type', () => {
        const expectedNativeType = JuiceType.UINT;
        const tokenType = TokenType.UINT_TYPE;

        const nativeType = tokenTypeToJuiceType(tokenType);

        expect(nativeType).toEqual(expectedNativeType);
    });

    it('should convert boolean type token to native boolean type', () => {
        const expectedNativeType = JuiceType.BOOLEAN;
        const tokenType = TokenType.BOOLEAN_TYPE;

        const nativeType = tokenTypeToJuiceType(tokenType);

        expect(nativeType).toEqual(expectedNativeType);
    });

    it('should convert object type token to native object type', () => {
        const expectedNativeType = JuiceType.OBJECT;
        const tokenType = TokenType.IDENTIFIER;

        const nativeType = tokenTypeToJuiceType(tokenType);

        expect(nativeType).toEqual(expectedNativeType);
    });

    it('should convert nothing type token to native nothing type', () => {
        const expectedNativeType = JuiceType.NOTHING;
        const tokenType = TokenType.NOTHING_TYPE;

        const nativeType = tokenTypeToJuiceType(tokenType);

        expect(nativeType).toEqual(expectedNativeType);
    });

    it('should throw error when no native type is matching token type', () => {
        expect(() => tokenTypeToJuiceType(TokenType.COMMA)).toThrowError('Unsupported type');
    })
});
