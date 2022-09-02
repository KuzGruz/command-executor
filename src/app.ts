import {FfmpegExecutor} from './core/executor/ffmpeg/ffmpeg.executor';
import {ConsoleOutput} from './output/console-output/console-output';

class App {
    async run(): Promise<void> {
        await new FfmpegExecutor(ConsoleOutput.instance).execute();
    }
}

const app = new App();
app.run().then();
