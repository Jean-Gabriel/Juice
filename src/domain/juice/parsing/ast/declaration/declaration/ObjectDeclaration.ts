import {Declaration} from "../Declaration";
import {Identifier} from "../../expression/expressions/IdentifierExpression";
import {TypedDeclaration} from "./TypedDeclaration";
import {Emitter} from "../../../../emitter/Emitter";

export class ObjectDeclaration implements Declaration {
    constructor(private name: Identifier, private attributes: TypedDeclaration[]) {}

    getName() {
        return this.name;
    }

    getAttributes() {
        return this.attributes;
    }

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitObjectDeclaration(this);
    }
}
