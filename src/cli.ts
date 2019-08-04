import inquirer from 'inquirer';
import fs from 'fs';
import { resolve } from 'path';
import ncp from 'ncp';
import mkdirp from 'mkdirp';
import { toTitleFormat, toPascalCase, toSnakeCase } from './utils';

interface INames {
  title: string;
  pascal: string;
  snake: string;
}

export async function cli() {
  try {
    const options= await promptForQuestions() as any;
    const names = {
      title: toTitleFormat(options.name),
      pascal: toPascalCase(options.name),
      snake: toSnakeCase(options.name),
    }

    const projectDirectory = await copyTemplate(options.directory); 
    await writeComponentName(projectDirectory, names);

    console.log('');
    console.log('Your project is ready!');
    console.log('To get started:');
    console.log('');
    console.log(`   cd ${options.directory}`);
    console.log(`   yarn install`);
    console.log(`   yarn start`);
    console.log('');
    console.log('The project will be running at localhost:3000');
    console.log('');
  }
  catch (err) {
    console.log('');
    console.log('Something went wrong while setting up your project');
    console.log('ERROR: ' + err.message);
  }
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
      }
    },
    {
      type: 'input',
      name: 'name',
      message: 'Choose a name for your component',
      validate: function(value: string) {
        const pass = /^[a-zA-Z]+((\d)|([A-Z0-9-][a-z0-9-]+))*([A-Z-])?$/.test(value);

        if (pass) {
          return true;
        }
  
        return 'Name must be camelCase, PascalCase or snake-case';
      }
    }
  ];

  console.log('');
  const options = inquirer.prompt(questions);
  return options;
}

async function copyTemplate(projectName: string) {
  const currentDirectory = process.cwd();
  const templateDirectory = resolve(__dirname, '../template');
  
  const projectDirectory: string = await new Promise((resolve, reject) => {
    const projectDir = `${currentDirectory}/${projectName}`;
    mkdirp(projectDir, (err) => {
      if (err) {
        reject('Could not create directory: ' + projectDir);
      }

      resolve(projectDir);
    });
  });

  await new Promise((resolve, reject) => {
    ncp.ncp(templateDirectory, projectDirectory, (err) => {
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
  await changeNameInfile(`${projectDirectory}/src/App.tsx`, new RegExp(/%component-name-title%/g), names.title);
}

async function changeNameInfile(file: string, changeWhere: RegExp ,changeTo: string) {
  const changedFile = await new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject('Could not read file');
      }

      const changed = data.replace(changeWhere, changeTo);

      resolve(changed);
    });
  });

  await new Promise((resolve, reject) => {
    fs.writeFile(file, changedFile, 'utf-8', (err) => {
      if (err) {
        reject('Could not write file');
      }

      resolve();
    });
  });
}