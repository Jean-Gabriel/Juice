import {Action} from "./domain/Action";
import {DirectoryFileManager} from "./infrastructure/DirectoryFileManager";
import {NodeIO} from "./infrastructure/Juice/NodeIO/NodeIO";
import {Tokenizer} from "./domain/Juice/Token/Tokenizer";
import {StringLexemeReader} from "./domain/Juice/Token/StringLexemeReader";
import {IO} from "./domain/Juice/IO";
import {FileManager} from "./domain/FileManager";
import {Parser} from "./domain/Juice/Ast/Parser";
import {TokenReader} from "./domain/Juice/Token/TokenReader";

const io: IO = new NodeIO();

if(process.argv.length < 4) {
    io.error('Juice needs an action and a file. (juice action file)');
    process.exit(1);
}

const action = process.argv[2];
const file = process.argv[3];

const fileManager: FileManager = new DirectoryFileManager();
const content = fileManager.open(__dirname, file);

if(action == Action.TOKENIZE) {
    const tokenizer = new Tokenizer(new StringLexemeReader(content));
    try {
        const tokens = tokenizer.tokenize();

        for(const token of tokens) {
            io.print(token.toString());
        }
    } catch (error) {
        io.print(error.toString());
    }
}

if(action == Action.CREATE_EXPRESSIONS) {
    try {
        const tokenizer = new Tokenizer(new StringLexemeReader(content));
        const tokens = tokenizer.tokenize();

        const parser = new Parser(new TokenReader(tokens));
        const expression = parser.parse();

        io.print(expression);
    } catch (error) {
        io.print(error.toString());
    }
}
