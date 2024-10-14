#!/usr/bin/env node
import { CLIApplication, HelpCommand, ImportCommand, VersionCommand, GenerateCommand } from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);
  console.log(process.argv);
  cliApplication.processCommand(process.argv);
}

bootstrap();
