import {IOutput} from '../output.types';

export class ConsoleOutput implements IOutput {

    private static outputInstance: ConsoleOutput;

    private constructor() {
    }

    static get instance(): ConsoleOutput {
        if (!this.outputInstance) {
            this.outputInstance = new ConsoleOutput();
        }

        return this.outputInstance;
    }

    end(): void {
        console.info('Stream the end!');
    }

    error(...args: any[]): void {
        console.error(`Error: ${args.toString()}`);
    }

    log(...args: any[]): void {
        console.log(`Data: ${args.toString()}`);
    }
}
