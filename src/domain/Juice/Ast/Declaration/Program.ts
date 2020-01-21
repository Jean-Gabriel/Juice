import {Declaration} from "./Declaration";

export class Program implements Declaration {
    constructor(private content: Declaration[] = []) {}

    add(declaration: Declaration) {
        this.content.push(declaration);
    }


}
