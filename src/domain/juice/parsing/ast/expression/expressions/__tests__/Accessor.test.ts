import {Accessor} from "../Accessor";

describe('Accessor', () => {
    describe('when adding a lower accessors', () => {
        it('should add it to the lowest level', () => {
            const accessor = new Accessor("firstLevel");

            accessor.addLowerSubAccessor(new Accessor("secondLevel"));
            accessor.addLowerSubAccessor(new Accessor("thirdLevel"));

            expect(accessor.getIdentifier()).toEqual("firstLevel.secondLevel.thirdLevel");
        });
    });
});
