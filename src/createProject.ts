import inquirer from 'inquirer';
import fs from 'fs';
import ncp from 'ncp';
import mkdirp from 'mkdirp';
import chalk from 'chalk';
import { resolve } from 'path';
import { toTitleFormat, toPascalCase, toSnakeCase, changeNameInfile, INames } from './utils';

export default async function createProject() {
  const options = (await promptForQuestions()) as any;
  const names = {
    title: toTitleFormat(options.name),
    pascal: toPascalCase(options.name),
    snake: toSnakeCase(options.name),
  };

  const projectDirectory = await copyTemplate(options.directory);
  await writeComponentName(projectDirectory, names);
  await writeProjectDescription(projectDirectory, options.description);

  const finishedMessage = `

    Your project is ready!
    To get started:

      cd ${options.directory}
      yarn install
      yarn start

    The project will be running at: ${chalk.magenta('localhost:3000')}

  `;

  console.log(chalk.greenBright(finishedMessage));
}

async function promptForQuestions() {
  const questions = [
    {
      type: 'input',
      name: 'directory',
      message: 'Choose a directory name for your project:',
      validate: function(value: string) {
        const pass = /^[a-zA-Z0-9-_]+$/.test(value);

        if (pass) {
          return true;
        }

        return 'Please enter a valid directory name';
      },
    },
    {
      type: 'input',
      name: 'name',
      message: 'Choose a name for your component',
      default: (current: any) => current.directory,
      validate: function(value: string) {
        const pass = /^[a-zA-Z]+((\d)|([A-Z0-9-][a-z0-9-]+))*([A-Z-])?$/.test(value);

        if (pass) {
          return true;
        }

        return 'Name must be camelCase, PascalCase or snake-case';
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'Give your component a description (optional)',
    },
  ];

  console.log('');
  const options = inquirer.prompt(questions);
  return options;
}

async function copyTemplate(projectName: string) {
  const currentDirectory = process.cwd();
  const templateDirectory = fs.realpathSync(resolve(__dirname, '../template'));

  const projectDirectory: string = await new Promise((resolve, reject) => {
    const projectDir = `${currentDirectory}/${projectName}`;
    mkdirp(projectDir, err => {
      if (err) {
        reject('Could not create directory: ' + projectDir);
      }

      resolve(projectDir);
    });
  });

  await new Promise((resolve, reject) => {
    ncp.ncp(templateDirectory, projectDirectory, err => {
      if (err) {
        reject('Could not copy template files');
      }

      resolve();
    });
  });

  return projectDirectory;
}

async function writeComponentName(projectDirectory: string, names: INames) {
  await changeNameInfile(`${projectDirectory}/public/index.html`, new RegExp(/%component-name-title%/g), names.title);
  await changeNameInfile(`${projectDirectory}/public/index.html`, new RegExp(/%component-name-snake%/g), names.snake);
  await changeNameInfile(`${projectDirectory}/package.json`, new RegExp(/%component-name-snake%/g), names.snake);
  await changeNameInfile(`${projectDirectory}/src/index.tsx`, new RegExp(/%component-name-snake%/g), names.snake);
  await changeNameInfile(`${projectDirectory}/src/index.tsx`, new RegExp(/%component-name-pascal%/g), names.pascal);
  await changeNameInfile(`${projectDirectory}/README.md`, new RegExp(/%component-name-title%/g), names.title);
  await changeNameInfile(`${projectDirectory}/README.md`, new RegExp(/%component-name-snake%/g), names.snake);
  await changeNameInfile(
    `${projectDirectory}/config/webpack.config.js`,
    new RegExp(/%component-name-pascal%/g),
    names.pascal,
  );
  await changeNameInfile(
    `${projectDirectory}/src/componentProperties.ts`,
    new RegExp(/%component-name-title%/g),
    names.title,
  );
}

async function writeProjectDescription(projectDirectory: string, description: string) {
  await changeNameInfile(`${projectDirectory}/README.md`, new RegExp(/%component-description%/g), description);
  await changeNameInfile(`${projectDirectory}/package.json`, new RegExp(/%component-description%/g), description);
}
