import {Point} from "../math/Point";

export class StringReader {
    private position = 0;
    private line = 1;
    private startOfCurrentRetrieval = 0;

    constructor(private content: string) {}

    advance() {
        if(this.isAtEnd()) {
            return '\0';
        }

        return this.content.charAt(this.position++);
    }

    advanceWhile(condition: () => boolean) {
        let consumed = '';

        while(condition() && !this.isAtEnd()) {
            if(this.peek() == '\n') {
                this.nextLine();
            }
            consumed += this.advance();
        }

        const then = (callback: () => void) => { callback(); return consumed; };
        const getConsumed = () => consumed;

        return {
            getConsumed,
            then,
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
        this.startOfCurrentRetrieval = this.position;
    }

    retrieve() {
        return this.content.substring(this.startOfCurrentRetrieval, this.position);
    }

    getCoordinates() {
        return new Point(this.line, this.startOfCurrentRetrieval);
    }

    nextLine() {
        this.line++;
    }
}
