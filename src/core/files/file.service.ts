import {dirname, isAbsolute, join} from 'path';
import {promises} from 'fs';

export class FileService {
    getFilePath(path: string, name: string, ext: string): string {
        if (!isAbsolute(path)) {
            path = join(__dirname, path);
        }
        return join(dirname(path), `${name}.${ext}`);
    }

    async deleteFile(path: string): Promise<void> {
        if (await this.isExist(path)) {
            await promises.unlink(path);
        }
    }

    private async isExist(path: string): Promise<boolean> {
        try {
            await promises.stat(path);
            return true;
        } catch (e: unknown) {
            return false;
        }
    }
}
