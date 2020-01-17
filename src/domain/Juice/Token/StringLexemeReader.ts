export class StringLexemeReader {
    private position = 0;
    private line = 1;
    private startOfCurrentLexeme = 0;

    constructor(private content: string) {}

    advance() {
        if(this.isAtEnd()) {
            return '\0';
        }

        return this.content.charAt(this.position++);
    }

    advanceLine() {
        while(this.peek() != '\n' && !this.isAtEnd()) {
            this.advance();
            this.nextLine();
        }
    }

    match(expected: string) {
        if(this.isAtEnd() || this.peek() != expected) {
            return false;
        }

        this.position++;
        return true;
    }

    peek() {
        if(this.isAtEnd()) {
            return '\0';
        }

        return this.content.charAt(this.position);
    }

    isAtEnd() {
        return this.content.length <= this.position;
    }

    fixStartPosition() {
        this.startOfCurrentLexeme = this.position;
    }

    currentStringLexeme() {
        return this.content.substring(this.startOfCurrentLexeme + 1, this.position - 1);
    }

    currentLexeme() {
        return this.content.substring(this.startOfCurrentLexeme, this.position);
    }

    getLine() {
        return this.line;
    }

    getCoordinates() {
        return `(${this.line}, ${this.startOfCurrentLexeme})`;
    }

    nextLine() {
        this.line++;
    }
}
