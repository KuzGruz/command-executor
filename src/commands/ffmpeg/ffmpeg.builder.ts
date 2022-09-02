import {ICommand, ICommandBuilder} from '../commands.types';

export class FfmpegBuilder implements ICommandBuilder {
    readonly command: string = 'ffmpeg'; // Add ffmpeg to PATH
    private readonly options = new Map<string, string>();
    private inputPath: string | undefined;
    private outputPath: string | undefined;

    constructor() {
        this.options.set('-c:v', 'libx264');
    }

    input(path: string): FfmpegBuilder {
        this.inputPath = path;
        return this;
    }

    output(path: string): FfmpegBuilder {
        this.outputPath = path;
        return this;
    }

    size(width: number, height: number): FfmpegBuilder {
        this.options.set('-s', `${width}x${height}`);
        return this;
    }

    build(): ICommand {
        if (!this.inputPath) {
            throw new Error('Input path must be defined!');
        }

        if (!this.outputPath) {
            throw new Error('Output path must be defined!');
        }

        const args: string[] = ['-i', this.inputPath];

        this.options.forEach((value, key) => {
            args.push(key);
            args.push(value);
        });

        args.push(this.outputPath);

        return {command: this.command, args};
    }
}
