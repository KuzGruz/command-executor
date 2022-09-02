import {PromptType} from './prompt.types';
import inquirer from 'inquirer';

export class PromptService {

    async input<Type>(message: string, type: PromptType): Promise<Type> {
        const {result} = await inquirer.prompt<{ result: Type }>([{type, message, name: 'result'}]);
        return result;
    }
}
