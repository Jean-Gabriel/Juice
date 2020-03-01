import {StringReader} from "../../../utils/StringReader";
import {provideTestReporter} from "../../../../infrastructure/juice/reporter/TestReporter";
import {Tokenizer} from "../../token/Tokenizer";
import {Parser} from "../Parser";
import {TokenReader} from "../../token/TokenReader";
import {Token} from "../../token/Token";
import {ValDeclaration} from "../ast/declaration/declaration/ValDeclaration";
import {FunctionCall} from "../ast/FunctionCall";
import {Accessor} from "../ast/expression/expressions/Accessor";
import {Program} from "../ast/declaration/Program";
import {BinaryExpression} from "../ast/expression/expressions/BinaryExpression";
import {LiteralExpression} from "../ast/expression/expressions/LiteralExpression";
import {UnaryExpression} from "../ast/expression/expressions/UnaryExpression";
import {ObjectDeclaration} from "../ast/declaration/declaration/ObjectDeclaration";
import {TypedDeclaration} from "../ast/declaration/declaration/TypedDeclaration";
import {JuiceType} from "../../types/JuiceTypes";
import {FunctionDeclaration} from "../ast/declaration/declaration/FunctionDeclaration";
import {ReturnStatement} from "../ast/statement/statements/ReturnStatement";
import {PrintStatement} from "../ast/statement/statements/PrintStatement";
import {Assignment} from "../ast/Assignment";
import {ObjectInstantiation} from "../ast/expression/expressions/ObjectInstantiation";

describe('Parser', () => {
    let reporter = provideTestReporter();

    beforeEach(() =>  {
        reporter = provideTestReporter();
    });

    describe('when encountering a val declaration', () => {
        it('should parse val declaration with function', () => {
            expectAstEqual('val test = returnTwo()', new Program([
                new ValDeclaration('test', new FunctionCall(new Accessor('returnTwo')))
                ])
            );
        });

        it('should parse val declaration with binary expression', () => {
            expectAstEqual('val test = 2 + -2', new Program([
                new ValDeclaration('test',
                    new BinaryExpression(
                        new LiteralExpression('2'), '+', new UnaryExpression('-', new LiteralExpression('2'))
                    )
                )])
            );
        });

        it('should parse val declaration with other val', () => {
            expectAstEqual('val test = other.value', new Program([
                new ValDeclaration('test',
                    new Accessor('other', new Accessor('value')))
            ]));
        });

        it('should parse val declaration with multiple expression', () => {
            expectAstEqual('val test = other.value + 2 + returnTwo()', new Program([
                new ValDeclaration('test',
                    new BinaryExpression(
                        new BinaryExpression(
                            new Accessor('other',
                                new Accessor('value')), '+',
                            new LiteralExpression('2')), '+',
                        new FunctionCall(
                            new Accessor('returnTwo')
                        )
                    )
                )
            ]));
        });

        it('should parse val declaration with object instantiation', () => {
            expectAstEqual('val test = new Person', new Program([
                new ValDeclaration('test',
                    new ObjectInstantiation('Person'))
            ]));
        });

        it('should not parse val declaration without equality', () => {
            expectError('val test');
        });
    });

    describe('when encountering an object declaration', () => {
        it('should parse object without attribute', () => {
            expectAstEqual('obj test {}', new Program([
                new ObjectDeclaration('test', []),
            ]));
        });

        it('should parse object with typed attributes', () => {
            expectAstEqual('obj test { string str uint num boolean bool OtherObject other }' , new Program([
                    new ObjectDeclaration('test', [
                        new TypedDeclaration('str', JuiceType.STRING),
                        new TypedDeclaration('num', JuiceType.UINT),
                        new TypedDeclaration('bool', JuiceType.BOOLEAN),
                        new TypedDeclaration('other', JuiceType.OBJECT),
                    ])
            ]));
        });

        it('should not parse object without left bracket', () => {
            expectError('obj test }');
        });

        it('shoud not parse object without right bracket', () => {
            expectError('obj test {')
        });

        it('should not parse object without bracket', () => {
            expectError('obj test');
        });
    });

    describe('when encountering a function declaration', () => {
        it('should parse function declaration with empty body', () => {
            expectAstEqual('fun test(): uint {}', new Program([
                new FunctionDeclaration('test', [], JuiceType.UINT),
            ]));
        });

        it('should parse function declaration with one argument', () => {
            expectAstEqual('fun test(uint num): SomeObject {}', new Program([
                new FunctionDeclaration('test', [
                    new TypedDeclaration('num', JuiceType.UINT),
                ], JuiceType.OBJECT),
            ]));
        });

        it('should parse function declaration with multiple arguments', () => {
           expectAstEqual('fun test(string str, boolean bool): nothing {}', new Program([
               new FunctionDeclaration('test', [
                   new TypedDeclaration('str', JuiceType.STRING),
                   new TypedDeclaration('bool', JuiceType.BOOLEAN),
               ], JuiceType.NOTHING),
           ]));
        });

        it('should parse function declaration with body', () => {
            expectAstEqual('fun test(): string { val x = 1 return x }', new Program([
                new FunctionDeclaration('test', [], JuiceType.STRING,[
                    new ValDeclaration('x', new LiteralExpression('1')),
                    new ReturnStatement(new Accessor('x')),
                ]),
            ]))
        });

        it('should parse function body that return an expression', () => {
            expectAstEqual('fun test(): uint { return 2 + 2 }', new Program([
                new FunctionDeclaration('test', [], JuiceType.UINT, [
                    new ReturnStatement(new BinaryExpression(
                        new LiteralExpression('2'), '+',
                        new LiteralExpression('2')
                    )),
                ]),
            ]));
        });

        it('should not parse function with missing right bracket', () => {
            expectError('fun test(): uint {');
        });


        it('should not parse function with missing left bracket', () => {
            expectError('fun test(): uint }');
        });


        it('should not parse function with missing brackets', () => {
            expectError('fun test(): uint');
        });

        it('should not parse function on missing left parenthesis', () => {
            expectError('fun test): uint {}');
        });

        it('should not parse function on missing right parenthesis', () => {
            expectError('fun test(: uint {}');
        });

        it('should not parse function without parenthesis', () => {
            expectError('fun test: uint {}');
        });

        it('should not parse function without identifier', () => {
            expectError('fun (): uint {}');
        });

        it('should not parse function without colon before type', () => {
            expectError('fun () uint {}');
        });

        it('should not parse function without type after colon', () => {
            expectError('fun (): {}');
        });

        it('should not parse function without specified return type', () => {
            expectError('fun () {}');
        });
    });

    describe('when encountering a print statement', () => {
        it('should parse with function call expression', () => {
            expectAstEqual('print(returnOne())', new Program([
                new PrintStatement(new FunctionCall(new Accessor('returnOne'))),
            ]));
        });

        it('should parse print with object accessor', () => {
            expectAstEqual('print(object.value)', new Program([
                new PrintStatement(new Accessor('object', new Accessor('value'))),
            ]));
        });

        it('should parse print statement with mathematical expression', () => {
            expectAstEqual('print(2 + 2 * 2)', new Program([
                new PrintStatement(new BinaryExpression(
                    new LiteralExpression('2'), '+',
                    new BinaryExpression(
                        new LiteralExpression('2'), '*',
                        new LiteralExpression('2')
                    )
                )),
            ]));
        });

        it('should parse empty print statement', () => {
            expectAstEqual('print()', new Program([
                new PrintStatement(new LiteralExpression(null)),
            ]));
        });

        it('should not parse print statement without closing parenthesis', () => {
            expectError('print(');
        });

        it('should not parse print statement without opening parenthesis', () => {
            expectError('print)');
        });

        it('should not parse print statement without parenthesis', () => {
            expectError('print')
        });
    });

    describe('when encountering an identifier', () => {
        describe('when it is a function call', () => {
            it('should parse function call', () => {
                expectAstEqual('call()', new Program([
                    new FunctionCall(new Accessor('call')),
                ]));
            });

            it('should parse function call with one argument', () => {
                expectAstEqual('call(i)', new Program([
                    new FunctionCall(new Accessor('call'), [
                        new Accessor('i'),
                    ]),
                ]));
            });

            it('should parse function call with multiple arguments', () => {
                expectAstEqual('call(i, b)', new Program([
                    new FunctionCall(new Accessor('call'), [
                        new Accessor('i'),
                        new Accessor('b'),
                    ]),
                ]));
            });

            it('should not parse function with multiple argument but no comma', () => {
                expectError('call(i j)');
            });

            it('should not parse function call with missing left parenthesis', () => {
                expectError('call)');
            });


            it('should not parse function call with missing right parenthesis', () => {
                expectError('call(');
            });
        });

        describe('when it is an assignment', () => {
            it('should parse assignment with accessor', () => {
                expectAstEqual('test = someNumber', new Program([
                    new Assignment(
                        new Accessor('test'),
                        new Accessor('someNumber'),
                    ),
                ]));
            });

            it('should parse assignment with expression', () => {
                expectAstEqual('test = 3 + 5', new Program([
                    new Assignment(
                        new Accessor('test'),
                        new BinaryExpression(
                            new LiteralExpression('3'), '+',
                            new LiteralExpression('5')
                        ),
                    ),
                ]));
            });

            it('should parse assignment with function call', () => {
                expectAstEqual('test = returnOne()', new Program([
                    new Assignment(
                        new Accessor('test'),
                        new FunctionCall(new Accessor('returnOne'))
                    ),
                ]));
            });

            it('should parse object attribute assignment with expression', () => {
                expectAstEqual('object.value = 1', new Program([
                    new Assignment(
                        new Accessor('object', new Accessor('value')),
                        new LiteralExpression('1'),
                    ),
                ]));
            });

            it('should not parse object without expression after equal', () => {
                expectError('test =');
            });

            it('should not parse object without equal', () => {
                expectError('test 1');
            });
        });
    });

    function expectAstEqual(content: string, expectedAst: Program) {
        const parser = provideParserFor(content);
        const ast = parser.parse();

        expect(ast).toEqual(expectedAst);
    }

    function expectError(content: string) {
        const parser = provideParserFor(content);

        expect(() => parser.parse()).toThrowError();
        expect(reporter.error).toHaveBeenCalledTimes(2);
        expect(reporter.print).toHaveBeenCalledTimes(1);
    }

    function provideParserFor(content: string) {
        const tokens = tokenize(content);
        return new Parser(provideTokenReaderFor(tokens), reporter);
    }

    function provideTokenReaderFor(tokens: Token[]) {
        return new TokenReader(tokens);
    }

    function provideStringReaderFor(content: string) {
        return new StringReader(content);
    }

    function tokenize(content: string) {
        return new Tokenizer(provideStringReaderFor(content), reporter).tokenize();
    }
});
