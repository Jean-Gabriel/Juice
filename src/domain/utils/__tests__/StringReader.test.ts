import {StringReader} from "../StringReader";

describe('StringReader', () => {
    describe('given a string', () => {
        describe('when reader is at end', () => {
           const reader = new StringReader('t');

           reader.advance();

           it('should return empty string when peeking', () => {
               expect(reader.peek()).toEqual('\0');
           });

           it('should return empty string when advancing', () => {
               expect(reader.advance()).toEqual('\0');
           });

       });

        it('should get current retrieval from fixed start to current position', () => {
            const reader = new StringReader('t "string" s');
            const expectedRetrieval = '"string"';
            reader.advanceWhile(() => reader.peek() != '"').then(() =>  { reader.fixStartPosition(); reader.advance() });
            reader.advanceWhile(() => reader.peek() != '"').then(() => reader.advance());

            const retrieval = reader.retrieve();

            expect(retrieval).toEqual(expectedRetrieval);
        });

        it('it should match identical string', () => {
            const reader = new StringReader('Tiktok');

            const matches = reader.match('T');

            expect(matches).toBeTruthy();
        });

        it('it should not match different string', () => {
            const reader = new StringReader('Tiktok');

            const matches = reader.match('c');

            expect(matches).toBeFalsy();
        });

        it('should give character at current position when peeking', () => {
            const reader = new StringReader('Tiktok');
            const expectedCharacter = 'T';

            const char = reader.peek();

            expect(char).toEqual(expectedCharacter);
        });
    });
});
