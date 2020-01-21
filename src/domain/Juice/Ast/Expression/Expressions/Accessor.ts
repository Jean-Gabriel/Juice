import {Expression} from "../Expression";
import {Identifier} from "./IdentifierExpression";

export class Accessor implements Expression {
    constructor(private identifier: Identifier, private subAccessor?: Accessor) {}

    addLowerSubAccessor(subAccessor: Accessor) {
        if(!this.subAccessor) {
            return this.subAccessor = subAccessor;
        }

        let currentAccessor = this.subAccessor;
        while(currentAccessor.subAccessor) {
            currentAccessor = currentAccessor.subAccessor;
        }

        currentAccessor.subAccessor = subAccessor;
    }
}
