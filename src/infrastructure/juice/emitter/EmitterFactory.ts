import {Action} from "../../../domain/Action";
import {TextEmitter} from "./text/TextEmitter";

export class EmitterFactory {
    createFor(action: Action) {
        return new TextEmitter()
    }
}
