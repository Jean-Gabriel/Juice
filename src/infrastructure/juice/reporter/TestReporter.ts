import {Reporter} from "../../../domain/juice/Reporter";

class TestReporter implements Reporter {
    error(message?: any, ...optionalParams: any[]): void {}

    print(message?: any, ...optionalParams: any[]): void {}
}

export function provideTestReporter() {
    const reporter = new TestReporter();
    reporter.error = jest.fn();
    reporter.print = jest.fn();

    return reporter;
}
