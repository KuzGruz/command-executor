import {ChildProcessWithoutNullStreams} from 'child_process';
import {IOutput} from '../../output/output.types';

export class StreamHandler {
    constructor(private readonly output: IOutput) {
    }

    processOutput(stream: ChildProcessWithoutNullStreams): void {
        stream.stdout.on('data', data => this.output.log(data.toString()));

        stream.stderr.on('data', data => this.output.error(data.toString()));

        stream.on('close', () => this.output.end());
    }
}
