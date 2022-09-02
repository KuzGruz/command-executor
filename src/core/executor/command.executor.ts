import {ChildProcessWithoutNullStreams} from 'child_process';
import {ICommand} from '../../commands/commands.types';

export abstract class CommandExecutor<Input> {

    async execute(): Promise<void> {
        const input = await this.prompt();
        const command = this.build(input);
        const stream = await this.spawn(command);
        this.processStream(stream);
    }

    protected abstract prompt(): Promise<Input>

    protected abstract build(input: Input): ICommand

    protected abstract spawn(command: ICommand): Promise<ChildProcessWithoutNullStreams>

    protected abstract processStream(stream: ChildProcessWithoutNullStreams): void
}

