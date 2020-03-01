import {Expression} from "../Expression";
import {Identifier} from "./IdentifierExpression";
import {Emitter} from "../../../../emitter/Emitter";

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

    getIdentifier() {
        let identifier = this.identifier;

        if(this.subAccessor) {
            identifier += `.${this.subAccessor.getIdentifier()}`
        }

        return identifier;
    }

    visit<T>(emitter: Emitter<T>): T {
        return emitter.emitAccessor(this);
    }
}
