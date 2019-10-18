/**
 * This script is ONLY meant to be used during development locally using npm link.
 * If you are linking this project use this script to create a new build
 */

const { execSync } = require('child_process');
const chalk = require('chalk');

console.log(chalk.white(' ✓ Removing old dependencies'));
execSync('yarn cleanup');

console.log(chalk.white(' ✓ Installing project'));
execSync('yarn');
execSync('yarn install-peer-deps');

console.log(chalk.white(' ✓ Building project'));
execSync('yarn build');

console.log(chalk.white(' ✓ Removing peer dependencies'));
execSync('yarn');