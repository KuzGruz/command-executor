export interface IOutput {
    log(...args: any[]): void;

    error(...args: any[]): void;

    end(): void;
}
