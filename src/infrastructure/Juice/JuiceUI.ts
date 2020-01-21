import {UI} from "../../domain/Juice/UI";

export class JuiceUI implements UI {
    private readonly prefix = "[Juice]:";
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
