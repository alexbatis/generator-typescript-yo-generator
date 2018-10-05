import { constants } from './Constants';
import * as Generator from "yeoman-generator";
import * as fs from "fs";
const directoryExists = require("directory-exists");

// Structure for object laying out different directories
interface DirectoryScaffold {
    root: string,
    templates: {
        base: string,
        test: string
    };
}

class GeneralUtils extends Generator {
    directories: DirectoryScaffold = this.createDirectoryScaffold();        // Commonly referenced directories

    constructor(args: any, options: any) {
        super(args, options)
        this.verifyTemplateDirectories().then(                              // Verify that all template directories exist
            (value => { }),                                                 // All template directories exist 
            (err => {
                console.error(err);                                         // A template file is missing 
                process.exit(1);                                            // Fatal error -> kill program
            })
        );
    }

    /* Creates an object containing commonly referenced directories */
    private createDirectoryScaffold(): DirectoryScaffold {
        const sourceRoot = `${__dirname.substring(0, __dirname.indexOf('generators'))}`;                    // Root directory of generator project
        return {
            root: sourceRoot,
            templates: {
                base: sourceRoot + constants.filePaths.templates.base,                                      // Base direcory for templates
                test: sourceRoot + constants.filePaths.templates.base + constants.filePaths.templates.test  // Direcory for test templates
            }
        };
    }

    /* Checks that all template directories exist so 'not found' errors dont happen during execution when looking for templates */
    private async verifyTemplateDirectories(): Promise<Boolean> {
        Object.values(this.directories.templates).forEach(async (templateDirectory) => {
            const exists = await directoryExists(templateDirectory);
            if (!exists) throw new Error(`${templateDirectory} does not exist and this directory is needed to generate files for the application`);
        })
        return true;
    }
}

export default GeneralUtils;