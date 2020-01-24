import {FileManagerTest, runFileManagerTest} from "../../../../domain/file/__tests__/FileManagerTest";
import {DirectoryFileManager} from "../DirectoryFileManager";

class DirectoryFileManagerTest implements FileManagerTest {
    provideFileManager() {
        return new DirectoryFileManager();
    };

}

describe('DirectoryFileManager', () => {
   runFileManagerTest(new DirectoryFileManagerTest());
});
