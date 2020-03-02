import {EmitterFactory} from "../EmitterFactory";
import {Action} from "../../../../domain/Action";
import {TextEmitter} from "../text/TextEmitter";

describe('EmitterFactory', () => {
    let emitterFactory: EmitterFactory;

    beforeEach(() => {
        emitterFactory = new EmitterFactory();
    });

    describe('given a not supported action', () => {
        it('should create text emitter by default', () => {
            const emitter = emitterFactory.createFor(Action.TOKENIZE);

            expect(emitter).toBeInstanceOf(TextEmitter);
        });
    });
});
