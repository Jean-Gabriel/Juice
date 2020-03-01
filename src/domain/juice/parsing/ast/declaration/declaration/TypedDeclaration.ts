import {Declaration} from "../Declaration";
import {JuiceType} from "../../../../types/JuiceTypes";
import {Identifier} from "../../expression/expressions/IdentifierExpression";
import {Emitter} from "../../../../emitter/Emitter";

export class TypedDeclaration implements Declaration {
    constructor(private name: Identifier, private type: JuiceType) {}

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitTypedDeclaration(this);
    }
}
