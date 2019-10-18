/**
 * This script will install all peer dependencies
 * These will not be installed using yarn install or npm install, and needs to be installed manually
 */

const { execSync } = require('child_process');
const fs = require('fs');

const package = require('../package.json');
const peerDeps = package.peerDependencies;

Object.entries(peerDeps).forEach(([package, version]) => {
  const cmd = `yarn add ${package}@${version}`;
  console.log('Executing: ', cmd);
  execSync(cmd);
});

fs.writeFileSync('package.json', JSON.stringify(package, null, 2), 'utf-8');