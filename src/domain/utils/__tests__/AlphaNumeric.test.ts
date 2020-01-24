import {isAlpha, isAlphaNumeric, isDigit} from "../AlphaNumeric";

describe('AlphaNumeric', () => {
    describe('given a letter', () => {
        const LETTER = 'c';

        it('should be an alpha', () => {
            expect(isAlpha(LETTER)).toBeTruthy();
        });

        it('should not be a digit', () => {
            expect(isDigit(LETTER)).toBeFalsy();
        });

        it('should be alphanumeric', () => {
            expect(isAlphaNumeric(LETTER)).toBeTruthy();
        });
    });

    describe('given a digit', () => {
        const DIGIT = '1';

        it('should not be an alpha', () => {
            expect(isAlpha(DIGIT)).toBeFalsy();
        });

        it('should be a digit', () => {
           expect(isDigit(DIGIT)).toBeTruthy();
        });

        it('should be alphanumeric', () => {
           expect(isAlphaNumeric(DIGIT)).toBeTruthy();
        });
    });

    describe('given a non alphanumeric character', () => {
        const NON_ALPHANUMERIC = '-';

        it('should be not alphanumeric', () => {
            expect(isAlphaNumeric(NON_ALPHANUMERIC)).toBeFalsy();
        });
    });
});
