import {Emitter} from "../../emitter/Emitter";

export interface AstVisitor {
    visit<T>(emitter: Emitter<T>): T;
}
