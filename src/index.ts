import {Action} from "./domain/Action";
import {DirectoryFileManager} from "./infrastructure/directory/file/DirectoryFileManager";
import {ConsoleReporter} from "./infrastructure/juice/reporter/ConsoleReporter";
import {Tokenizer} from "./domain/juice/token/Tokenizer";
import {StringReader} from "./domain/utils/StringReader";
import {Reporter} from "./domain/juice/Reporter";
import {FileManager} from "./domain/file/FileManager";
import {Parser} from "./domain/juice/parsing/Parser";
import {TokenReader} from "./domain/juice/token/TokenReader";
import {TextEmitter} from "./infrastructure/juice/emitter/text/TextEmitter";

const reporter: Reporter = new ConsoleReporter();

if(process.argv.length < 4) {
    reporter.error('juice needs an action and a file. (juice action file)');
    process.exit(1);
}

const action = process.argv[2];
const file = process.argv[3];

const fileManager: FileManager = new DirectoryFileManager();
const content = fileManager.read(__dirname, file);

if(action == Action.TOKENIZE) {
    const tokenizer = new Tokenizer(new StringReader(content), reporter);
    const tokens = tokenizer.tokenize();

    for(const token of tokens) {
        reporter.print(token.toString());
    }
}

if(action == Action.PARSE) {
    const tokenizer = new Tokenizer(new StringReader(content), reporter);
    const tokens = tokenizer.tokenize();
    const emitter = new TextEmitter();

    const parser = new Parser(new TokenReader(tokens), reporter);
    try {
        const program = parser.parse();
        reporter.print(`Emitting to string: \n${emitter.emit(program)}`);
    } catch (e) {
        reporter.print("Parsing was forcefully terminated.")
    }
}
