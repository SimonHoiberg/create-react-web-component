import inquirer from 'inquirer';
import fs from 'fs';
import ncp from 'ncp';
import chalk from 'chalk';
import rimraf from 'rimraf';
import merge from 'deepmerge';
import { resolve } from 'path';
import { changeNameInfile, toPascalCase } from './utils';

export default function updateProject() {
  if (!checkValidProjectFolder()) {
    console.log('');
    console.log(chalk.red("The current directory doesn't seem to be a valid project directory"));
    console.log(chalk.red('Please cd into a valid project directory in order to update'));
    console.log('');
    return;
  }

  updateTemplateFiles();
}

async function promptForUpdateConfirmation() {
  const message = `
    Following files will be updated:

    - config/*
    - scripts/*
    - src/utils/EventContext.tsx
    - src/utils/Styled.tsx
    - src/declarations.d.ts
    - src/index.tsx

    Changes in these files will be forever lost.
    Are you absolutely sure that you want to update?

  `;

  const confirm = await inquirer.prompt({
    name: 'updateConfirm',
    type: 'confirm',
    message,
  });

  return confirm.updateConfirm;
}

function checkValidProjectFolder() {
  const currentDirectory = process.cwd();

  const srcExists = fs.existsSync(`${currentDirectory}/src`);
  const configExists = fs.existsSync(`${currentDirectory}/config`);
  const scriptsExists = fs.existsSync(`${currentDirectory}/scripts`);
  const utilsExists = fs.existsSync(`${currentDirectory}/src/utils`);
  const packageExists = fs.existsSync(`${currentDirectory}/package.json`);
  const tsconfigExists = fs.existsSync(`${currentDirectory}/tsconfig.json`);

  return srcExists && configExists && scriptsExists && utilsExists && packageExists && tsconfigExists;
}

async function updateTemplateFiles() {
  const shouldUpdate = await promptForUpdateConfirmation();

  if (!shouldUpdate) {
    return;
  }

  removeOutdatedFiles();
  await copyNewFiles();
  await mergeFiles();
  await writeComponentName();

  const finishedMessage = `
  
    Your project is now up to date with the latest changes from create-react-web-component

  `;

  console.log(chalk.greenBright(finishedMessage));
}

function removeOutdatedFiles() {
  const currentDirectory = process.cwd();
  rimraf.sync(`${currentDirectory}/config`);
  rimraf.sync(`${currentDirectory}/scripts`);
  fs.unlinkSync(`${currentDirectory}/src/utils/EventContext.tsx`);
  fs.unlinkSync(`${currentDirectory}/src/utils/Styled.tsx`);
  fs.unlinkSync(`${currentDirectory}/src/index.tsx`);
}

async function copyNewFiles() {
  const currentDirectory = process.cwd();
  const templateDirectory = fs.realpathSync(resolve(__dirname, '../template'));

  await copyNewFile(`${templateDirectory}/config`, `${currentDirectory}/config`);
  await copyNewFile(`${templateDirectory}/scripts`, `${currentDirectory}/scripts`);
  await copyNewFile(
    `${templateDirectory}/src/utils/EventContext.tsx`,
    `${currentDirectory}/src/utils/EventContext.tsx`,
  );
  await copyNewFile(`${templateDirectory}/src/utils/Styled.tsx`, `${currentDirectory}/src/utils/Styled.tsx`);
  await copyNewFile(`${templateDirectory}/src/declarations.d.ts`, `${currentDirectory}/src/declarations.d.ts`);
  await copyNewFile(`${templateDirectory}/src/index.tsx`, `${currentDirectory}/src/index.tsx`);
}

async function copyNewFile(filePath: string, copyPath: string) {
  await new Promise((resolve, reject) => {
    ncp.ncp(filePath, copyPath, err => {
      if (err) {
        reject('Could not copy file: ' + filePath);
      }

      resolve();
    });
  });
}

async function mergeFiles() {
  const currentDirectory = process.cwd();
  const templateDirectory = fs.realpathSync(resolve(__dirname, '../template'));

  const currentTsConfig = require(`${currentDirectory}/tsconfig.json`);
  const newTsConfig = require(`${templateDirectory}/tsconfig.json`);
  const updatedTsConfig = merge(currentTsConfig, newTsConfig);
  fs.writeFileSync(`${currentDirectory}/tsconfig.json`, JSON.stringify(updatedTsConfig, null, 2));

  const currentPackageJson = require(`${currentDirectory}/package.json`);
  const newPackageJson = require(`${templateDirectory}/package.json`);
  delete newPackageJson.name;
  delete newPackageJson.description;
  const updatedPackageJson = merge(currentPackageJson, newPackageJson);
  fs.writeFileSync(`${currentDirectory}/package.json`, JSON.stringify(updatedPackageJson, null, 2));
}

async function writeComponentName() {
  const currentDirectory = process.cwd();
  const currentPackageJson = require(`${currentDirectory}/package.json`);
  const snakeCaseName = currentPackageJson.name;
  const pascalName = toPascalCase(snakeCaseName);

  await changeNameInfile(`${currentDirectory}/src/index.tsx`, new RegExp(/%component-name-snake%/g), snakeCaseName);
  await changeNameInfile(`${currentDirectory}/src/index.tsx`, new RegExp(/%component-name-pascal%/g), pascalName);
  await changeNameInfile(
    `${currentDirectory}/config/webpack.config.js`,
    new RegExp(/%component-name-pascal%/g),
    pascalName,
  );
} 
