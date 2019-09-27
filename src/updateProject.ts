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
    const message = `
    
      The current directory doesn't seem to be a valid project directory.
      Please cd into a valid project directory in order to update

    `;

    console.log(chalk.red(message));
    return;
  }

  updateTemplateFiles();
}

async function promptForUpdateConfirmation() {
  const message = `
    Following files will be updated:

    - config/config-overrides.js
    - src/utils/EventContext.tsx
    - src/utils/Styled.tsx
    - src/declarations.d.ts
    - src/index.tsx
    - tsconfig.json

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

  const validFiles = [
    fs.existsSync(`${currentDirectory}/config/config-overrides.js`),
    fs.existsSync(`${currentDirectory}/src/utils/EventContext.tsx`),
    fs.existsSync(`${currentDirectory}/src/utils/Styled.tsx`),
    fs.existsSync(`${currentDirectory}/src/declarations.d.ts`),
    fs.existsSync(`${currentDirectory}/src/index.tsx`),
    fs.existsSync(`${currentDirectory}/package.json`),
    fs.existsSync(`${currentDirectory}/tsconfig.json`),
  ];

  return validFiles.every(file => file);
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
  fs.unlinkSync(`${currentDirectory}/config/config-overrides.js`);
  fs.unlinkSync(`${currentDirectory}/src/utils/EventContext.tsx`);
  fs.unlinkSync(`${currentDirectory}/src/utils/Styled.tsx`);
  fs.unlinkSync(`${currentDirectory}/src/index.tsx`);
  fs.unlinkSync(`${currentDirectory}/tsconfig.json`);
}

async function copyNewFiles() {
  const currentDirectory = process.cwd();
  const templateDirectory = fs.realpathSync(resolve(__dirname, '../template'));

  await copyNewFile(
    `${templateDirectory}/config/config-overrides.js`,
    `${currentDirectory}/config/config-overrides.js`,
  );
  await copyNewFile(
    `${templateDirectory}/src/utils/EventContext.tsx`,
    `${currentDirectory}/src/utils/EventContext.tsx`,
  );
  await copyNewFile(`${templateDirectory}/src/utils/Styled.tsx`, `${currentDirectory}/src/utils/Styled.tsx`);
  await copyNewFile(`${templateDirectory}/src/declarations.d.ts`, `${currentDirectory}/src/declarations.d.ts`);
  await copyNewFile(`${templateDirectory}/src/index.tsx`, `${currentDirectory}/src/index.tsx`);
  await copyNewFile(`${templateDirectory}/tsconfig.json`, `${currentDirectory}/tsconfig.json`);
}

async function copyNewFile(filePath: string, copyPath: string) {
  await new Promise((resolve, reject) => {
    ncp.ncp(filePath, copyPath, (err) => {
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

  const currentPackageJson = require(`${currentDirectory}/package.json`);
  const newPackageJson = require(`${templateDirectory}/package.json`);

  const currentDependencies = currentPackageJson.dependencies;
  const newDependencies = newPackageJson.dependencies;

  const mergedDependencies = merge(currentDependencies, newDependencies);
  currentPackageJson.dependencies = mergedDependencies;

  const currentScripts = currentPackageJson.scripts;
  const newScripts = newPackageJson.scripts;

  const mergedScripts = merge(currentScripts, newScripts);
  currentPackageJson.scripts = mergedScripts;

  fs.writeFileSync(`${currentDirectory}/package.json`, JSON.stringify(currentPackageJson, null, 2));
}

async function writeComponentName() {
  const currentDirectory = process.cwd();
  const currentPackageJson = require(`${currentDirectory}/package.json`);
  const snakeCaseName = currentPackageJson.name;
  const pascalName = toPascalCase(snakeCaseName);

  await changeNameInfile(`${currentDirectory}/src/index.tsx`, new RegExp(/%component-name-snake%/g), snakeCaseName);
  await changeNameInfile(`${currentDirectory}/src/index.tsx`, new RegExp(/%component-name-pascal%/g), pascalName);
  await changeNameInfile(
    `${currentDirectory}/config/config-overrides.js`,
    new RegExp(/%component-name-pascal%/g),
    pascalName,
  );
}
