import {Action} from "./domain/Action";
import {DirectoryFileManager} from "./infrastructure/DirectoryFileManager";
import {JuiceUI} from "./infrastructure/Juice/JuiceUI";
import {Tokenizer} from "./domain/Juice/Token/Tokenizer";
import {StringLexemeReader} from "./domain/Juice/utils/StringLexemeReader";
import {UI} from "./domain/Juice/UI";
import {FileManager} from "./domain/FileManager";
import {Parser} from "./domain/Juice/Ast/Parser";
import {TokenReader} from "./domain/Juice/Token/TokenReader";

const ui: UI = new JuiceUI();

if(process.argv.length < 4) {
    ui.error('Juice needs an action and a file. (juice action file)');
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
            ui.print(token.toString());
        }
    } catch (error) {
        ui.print(error.toString());
    }
}

if(action == Action.PARSE) {
    try {
        const tokenizer = new Tokenizer(new StringLexemeReader(content));
        const tokens = tokenizer.tokenize();

        const parser = new Parser(new TokenReader(tokens));
        const program = parser.parse() as any;

        ui.print(program.content);
    } catch (error) {
        ui.print(error.toString());
    }
}
