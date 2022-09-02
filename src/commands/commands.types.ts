export interface ICommandBuilder {
    readonly command: string;

    build(): ICommand;
}

export interface ICommand {
    command: string;
    args: string[];
}
