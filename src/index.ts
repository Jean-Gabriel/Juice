import {Action} from "./domain/Action";
import {DirectoryFileManager} from "./infrastructure/directory/file/DirectoryFileManager";
import {ConsoleUI} from "./infrastructure/juice/ConsoleUI";
import {Tokenizer} from "./domain/juice/token/Tokenizer";
import {StringReader} from "./domain/utils/StringReader";
import {UI} from "./domain/juice/UI";
import {FileManager} from "./domain/file/FileManager";
import {Parser} from "./domain/juice/ast/Parser";
import {TokenReader} from "./domain/juice/token/TokenReader";

const ui: UI = new ConsoleUI();

if(process.argv.length < 4) {
    ui.error('juice needs an action and a file. (juice action file)');
    process.exit(1);
}

const action = process.argv[2];
const file = process.argv[3];

const fileManager: FileManager = new DirectoryFileManager();
const content = fileManager.read(__dirname, file);

if(action == Action.TOKENIZE) {
    const tokenizer = new Tokenizer(new StringReader(content));
    try {
        const tokens = tokenizer.tokenize();

        for(const token of tokens) {
            ui.print(token.toString());
        }
    } catch (error) {
        ui.print(error.toString());
    }
}

if(action == Action.PARSE) {
    try {
        const tokenizer = new Tokenizer(new StringReader(content));
        const tokens = tokenizer.tokenize();

        const parser = new Parser(new TokenReader(tokens));
        const program = parser.parse() as any;

        ui.print(program.content);
    } catch (error) {
        ui.print(error.toString());
    }
}
