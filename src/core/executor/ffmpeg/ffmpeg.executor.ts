import {CommandExecutor} from '../command.executor';
import {ChildProcessWithoutNullStreams, spawn} from 'child_process';
import {IOutput} from '../../../output/output.types';
import {IFfmpegTypesInput} from './ffmpeg.types';
import {FileService} from '../../files/file.service';
import {PromptService} from '../../prompt/prompt.service';
import {PromptType} from '../../prompt/prompt.types';
import {FfmpegBuilder} from '../../../commands/ffmpeg/ffmpeg.builder';
import {ICommand} from '../../../commands/commands.types';
import {StreamHandler} from '../../handlers/stream.handler';

export class FfmpegExecutor extends CommandExecutor<IFfmpegTypesInput> {
    private readonly fileService: FileService = new FileService();
    private readonly promptService: PromptService = new PromptService();
    private outputPath!: string;

    constructor(private readonly output: IOutput) {
        super();
    }

    protected async prompt(): Promise<IFfmpegTypesInput> {
        const width = await this.promptService.input<number>('Video width:', PromptType.Number);
        const height = await this.promptService.input<number>('Video height:', PromptType.Number);
        const path = await this.promptService.input<string>('Video path:', PromptType.Input);
        const name = await this.promptService.input<string>('Video name:', PromptType.Input);
        return {width, height, path, name};
    }

    protected build({width, name, height, path}: IFfmpegTypesInput): ICommand {
        this.outputPath = this.fileService.getFilePath(path, name, 'mp4');
        return new FfmpegBuilder().input(path).size(width, height).output(this.outputPath).build();
    }

    protected async spawn({command, args}: ICommand): Promise<ChildProcessWithoutNullStreams> {
        await this.fileService.deleteFile(this.outputPath);
        return spawn(command, args);
    }

    protected processStream(stream: ChildProcessWithoutNullStreams): void {
        const handler = new StreamHandler(this.output);
        handler.processOutput(stream);
    }
}
