const chalk = require("chalk");
const yosay = require("yosay");
import * as Generator from "yeoman-generator";
import { constants } from '../utils/Constants';
import GeneralUtils from "../utils/GeneralUtils";

class SimpleGenerator extends Generator {
	answers: any;					// Answers captured by prompt
	generalUtils: GeneralUtils;		// General utilities for yeoman generators

	constructor(args: any, options: any) {
		super(args, options);
		this.generalUtils = new GeneralUtils(args, options);
		this.log(yosay(`Welcome to the ${chalk.red(`${constants.GENERATOR_NAME}`)}!`));
	}

	// Your initialization methods (checking current project state, getting configs, etc
	public initialize(): void { }

	public async prompting() {
		this.answers = await this.prompt(constants.prompts.appPrompt);
	}

	// Saving configurations and configure the project (creating .editorconfig files and other metadata files 
	public configuring(): void { }

	//  Where you write the generator specific files (routes, controllers, etc)
	public writing(): void {
		const outputDirectory = this.answers.outputDirectory + `/${this.answers.appName}`;

		// Write files from tes template
		this.fs.copyTpl(
			this.generalUtils.directories.templates.test,
			outputDirectory, { title: this.answers.appName }
		);
	}

	// Where installation are run (npm, bower)
	public install(): void { }

	// Called last, cleanup, say good bye, etc
	public end(): void { }
}

export default SimpleGenerator;
