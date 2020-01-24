import {Reporter} from "../../../domain/juice/Reporter";

export class ConsoleReporter implements Reporter {
    private readonly prefix = "[Juice]:";
    private readonly errorPrefix = 'Error:';

    error(message?: any, ...optionalParams: any[]): void {
        this.print(this.errorPrefix, message, ...optionalParams);
    }

    print(message?: any, ...optionalParams: any[]): void {
        if(!message) {
            return;
        }

        if(optionalParams.length != 0) {
            console.log(this.prefix, message, ...optionalParams);
        } else {
            console.log(this.prefix, message);
        }
    }
}
