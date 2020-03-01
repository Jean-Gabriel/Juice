import {Declaration} from "./Declaration";
import {Emitter} from "../../../emitter/Emitter";

export class Program implements Declaration {
    public static empty(): Program {
        return new Program([]);
    }

    constructor(private content: Declaration[]) {}

    add(declaration: Declaration) {
        this.content.push(declaration);
    }

    getContent() {
        return this.content;
    }

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitProgram(this);
    }
}
