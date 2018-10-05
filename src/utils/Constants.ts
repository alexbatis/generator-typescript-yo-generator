class Prompts {
    appPrompt = [{
        type: "input",
        name: "outputDirectory",
        message: "Directory to generate application",
        default: process.cwd()
    }, {
        type: "input",
        name: "appName",
        message: "Your app's name",
        default: 'my-app'
    }];
}


class Constants {
    GENERATOR_NAME: string = 'typescript-yo-generator';

    // Filepaths
    filePaths = {
        templates: {
            base: '/templates',
            test: '/test'
        }
    }

    // Prompts
    prompts = new Prompts();
}

export const constants = new Constants();