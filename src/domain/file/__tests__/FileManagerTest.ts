import {FileManager} from "../FileManager";

export interface FileManagerTest {
    provideFileManager: () => FileManager;
}

export function runFileManagerTest(fileManagerTest: FileManagerTest) {
    describe('FileManager', () => {
        const PATH = `${__dirname}/resources`;
        const FILE = 'FileManagerText.txt';

        it('should read a file content', () => {
            const fileManager = fileManagerTest.provideFileManager();
            const expectedContent = `You found the secret code.`;

            const content = fileManager.read(PATH, FILE).trimRight(); // Reading a file always leaves a trailing new line at the end.

            expect(content).toEqual(expectedContent);
        })
    });
}
