import {Declaration} from "./Declaration";

export class Program implements Declaration {
    public static empty(): Program {
        return new Program([]);
    }

    constructor(private content: Declaration[]) {}

    add(declaration: Declaration) {
        this.content.push(declaration);
    }
}
