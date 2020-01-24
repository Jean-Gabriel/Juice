import {UI} from "../../domain/juice/UI";

export class ConsoleUI implements UI {
    private readonly prefix = "[juice]:";
    private readonly errorPrefix = 'Error:';

    error(message?: any, ...optionalParams: any[]): void {
        if(optionalParams.length != 0) {
            this.print(this.errorPrefix, message, optionalParams);
        } else {
            this.print(this.errorPrefix, message);
        }
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
